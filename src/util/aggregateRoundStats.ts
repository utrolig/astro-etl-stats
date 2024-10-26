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
  team: string
} & PlayerStats

export type TeamData = {
  name: Team
  players: PlayerData[]
}

export function aggregateRoundStats(group: GroupDetails) {
  const { rounds } = group.match

  const alpha: TeamData = {
    name: 'alpha',
    players: [],
  }

  const beta: TeamData = {
    name: 'beta',
    players: [],
  }

  const playersMap: Record<string, PlayerData> = {}

  rounds.forEach((round, idx) => {
    Object.entries(round.round_data.player_stats).forEach(
      ([playerId, player]) => {
        let playerData = playersMap[playerId]

        if (!playerData) {
          const wstatsLength = player.weaponStats.length
          const wstats = player.weaponStats.map(Number)

          const damageGiven = wstats[wstatsLength - 10] ?? 0
          const damageReceived = wstats[wstatsLength - 9] ?? 0
          const teamDamageGiven = wstats[wstatsLength - 8] ?? 0
          const teamDamageReceived = wstats[wstatsLength - 7] ?? 0
          const gibs = wstats[wstatsLength - 6] ?? 0
          const selfKills = wstats[wstatsLength - 5] ?? 0
          const teamKills = wstats[wstatsLength - 4] ?? 0
          const teamGibs = wstats[wstatsLength - 3] ?? 0
          const playtime = wstats[wstatsLength - 2] ?? 0
          const xp = wstats[wstatsLength - 1] ?? 0

          playerData = playersMap[playerId] = {
            id: playerId,
            name: player.name,
            team: player.team,
            weaponStats: [],
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

        const convertedStats = convertWeaponStats(
          player.weaponStats.map(Number),
        )

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

          const convertedPreviousStats = convertWeaponStats(
            previousWeaponStats.map(Number),
          )

          convertedStats.forEach((stat) => {
            const previousEntry = convertedPreviousStats.find(
              (ws) => ws.id === stat.id,
            )

            if (previousEntry) {
              stat.hits = stat.hits - previousEntry.hits
              stat.kills = stat.kills - previousEntry.kills
              stat.shots = stat.shots - previousEntry.shots
              stat.deaths = stat.deaths - previousEntry.deaths
              stat.headshots = stat.headshots - previousEntry.headshots

              stat.acc = stat.hits / stat.shots
            }
          })
        }

        playerData.weaponStats.push(...convertedStats)
      },
    )
  })

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
