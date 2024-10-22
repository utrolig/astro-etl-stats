import type { GroupDetails, Team } from '@/util/stats-api'

export function getPlayers(
  team: Team,
  groupDetails: GroupDetails,
): { nick: string; id: string }[] {
  const firstRound = groupDetails.match.rounds[0]

  if (!firstRound) {
    return []
  }

  const targetTeam = team === 'alpha' ? '1' : '2'

  const players = Object.values(firstRound.round_data.player_stats)
    .filter((player) => player.team === targetTeam)
    .map((player) => ({ id: player.guid, nick: player.name }))

  return players
}
