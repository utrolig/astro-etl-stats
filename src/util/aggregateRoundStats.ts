import { convertWeaponStats, type Weapon } from './convertWeaponStats'
import type { GroupDetails, Team } from './stats-api'

export type PlayerStats = {
  damageGiven: number
  damageReceived: number
  teamDamageGiven: number
  teamDamageReceived: number
  gibs: number
  selfKills: number
  teamKills: number
  teamGibs: number
  playtime: number
  xp: number
}

export type PlayerData = {
  id: string
  name: string
  weaponStats: Weapon[]
  playerStats: PlayerStats[]
  team: string
}

export type TeamData = {
  name: Team
  players: PlayerData[]
}

export function aggregateRoundStats(group: GroupDetails) {
  const alpha: TeamData = {
    name: 'alpha',
    players: [],
  }

  const beta: TeamData = {
    name: 'beta',
    players: [],
  }

  const playersMap = getGroupStats(group)

  Object.values(playersMap).forEach((player) => {
    if (player.team === '1') {
      alpha.players.push(player)
    } else {
      beta.players.push(player)
    }
  })

  return { alpha, beta }
}

function getPlayerStats(rawStats: string[]): PlayerStats {
  const nums = rawStats.map(Number)
  const numLength = nums.length

  const damageGiven = nums[numLength - 10] ?? 0
  const damageReceived = nums[numLength - 9] ?? 0
  const teamDamageGiven = nums[numLength - 8] ?? 0
  const teamDamageReceived = nums[numLength - 7] ?? 0
  const gibs = nums[numLength - 6] ?? 0
  const selfKills = nums[numLength - 5] ?? 0
  const teamKills = nums[numLength - 4] ?? 0
  const teamGibs = nums[numLength - 3] ?? 0
  const playtime = nums[numLength - 2] ?? 0
  const xp = nums[numLength - 1] ?? 0

  return {
    damageGiven,
    damageReceived,
    teamDamageGiven,
    teamDamageReceived,
    gibs,
    selfKills,
    teamKills,
    teamGibs,
    playtime,
    xp,
  }
}

function convertTimeToMinutes(time: string): number {
  const [minutes, seconds] = time.split(':').map(Number)

  const mins = minutes as number
  const secs = seconds as number

  return mins + secs / 60
}

function getSecondRoundPlaytime(
  firstRoundPlaytimePercentage: number,
  totalPlaytimePercentage: number,
  firstRoundDuration: string,
  secondRoundDuration: string,
) {
  const r1Percentage = firstRoundPlaytimePercentage
  const r1Duration = convertTimeToMinutes(firstRoundDuration)
  const r2Duration = convertTimeToMinutes(secondRoundDuration)
  const totalDuration = r1Duration + r2Duration
  const totalPercentage = totalPlaytimePercentage

  const round2Percentage =
    (totalPercentage * totalDuration - r1Percentage * r1Duration) / r2Duration

  return Math.round(round2Percentage * 100) / 100
}

export type GroupStats = Record<string, PlayerData>

export function getGroupStats(group: GroupDetails): GroupStats {
  const { rounds } = group.match
  const playersMap: Record<string, PlayerData> = {}
  rounds.forEach((round, idx) => {
    Object.entries(round.round_data.player_stats).forEach(
      ([playerId, player]) => {
        let playerData = playersMap[playerId]

        if (!playerData) {
          playerData = playersMap[playerId] = {
            id: playerId,
            name: player.name,
            team: player.team,
            weaponStats: [],
            playerStats: [],
          }
        }

        const convertedStats = convertWeaponStats(
          player.weaponStats.map(Number),
        )

        const playerStats = getPlayerStats(player.weaponStats)

        const isFirstRound = round.round_data.round_info.round % 2

        if (!isFirstRound) {
          const previousRound = rounds[idx - 1]

          if (
            previousRound?.round_data.round_info.mapname !==
            round.round_data.round_info.mapname
          ) {
            throw new Error(
              'Previous round is not same map as current round. This should never happen.',
            )
          }

          const previousWeaponStats =
            previousRound.round_data.player_stats[playerId]?.weaponStats

          if (!previousWeaponStats) {
            throw new Error(
              `Cant find weapon stats of previous round for player ${playerId}: ${player.name}`,
            )
          }

          const convertedPreviousWeaponStats = convertWeaponStats(
            previousWeaponStats.map(Number),
          )

          const convertedPreviousPlayerStats =
            getPlayerStats(previousWeaponStats)

          convertedStats.forEach((stat) => {
            const previousEntry = convertedPreviousWeaponStats.find(
              (ws) => ws.id === stat.id,
            )

            if (previousEntry) {
              stat.hits = stat.hits - previousEntry.hits
              stat.kills = stat.kills - previousEntry.kills
              stat.shots = stat.shots - previousEntry.shots
              stat.deaths = stat.deaths - previousEntry.deaths
              stat.headshots = stat.headshots - previousEntry.headshots

              stat.acc = stat.hits / stat.shots

              if (isNaN(stat.acc)) {
                stat.acc = 0
              }
            }
          })

          playerStats.playtime = getSecondRoundPlaytime(
            convertedPreviousPlayerStats.playtime,
            playerStats.playtime,
            previousRound.round_data.round_info.nextTimeLimit,
            round.round_data.round_info.nextTimeLimit,
          )
          playerStats.xp = playerStats.xp - convertedPreviousPlayerStats.xp
          playerStats.gibs =
            playerStats.gibs - convertedPreviousPlayerStats.gibs
          playerStats.teamGibs =
            playerStats.teamGibs - convertedPreviousPlayerStats.teamGibs
          playerStats.selfKills =
            playerStats.selfKills - convertedPreviousPlayerStats.selfKills
          playerStats.teamKills =
            playerStats.teamKills - convertedPreviousPlayerStats.teamKills
          playerStats.damageGiven =
            playerStats.damageGiven - convertedPreviousPlayerStats.damageGiven
          playerStats.damageReceived =
            playerStats.damageReceived -
            convertedPreviousPlayerStats.damageReceived
          playerStats.teamDamageGiven =
            playerStats.teamDamageGiven -
            convertedPreviousPlayerStats.teamDamageGiven
          playerStats.teamDamageReceived =
            playerStats.teamDamageReceived -
            convertedPreviousPlayerStats.teamDamageReceived
        }

        playerData.playerStats.push(playerStats)
        playerData.weaponStats.push(...convertedStats)
      },
    )
  })

  return playersMap
}
