import type { GroupDetails, Team } from './stats-api'
import { convertWeaponStats, type Weapon } from './convertWeaponStats'

export type PlayerData = {
  id: string
  name: string
  weaponStats: Weapon[]
  team: string
}

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
          playerData = playersMap[playerId] = {
            id: playerId,
            name: player.name,
            team: player.team,
            weaponStats: [],
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
