import type { GroupDetails } from '@/util/stats-api'

interface MatchResult {
  alpha: number
  beta: number
  mapScores: {
    [key: string]: {
      alpha: number
      beta: number
    }
  }
  winner: string | null
}

export function getMatchResult({ match }: GroupDetails): MatchResult {
  const score: MatchResult = {
    alpha: 0,
    beta: 0,
    mapScores: {},
    winner: match.winner,
  }

  match.maps.forEach((map) => {
    score.mapScores[map] = {
      alpha: 0,
      beta: 0,
    }
  })

  match.rounds.forEach((round) => {
    const { winnerteam, mapname } = round.round_data.round_info

    if (winnerteam === 1) {
      score.alpha += 1
    } else if (winnerteam === 2) {
      score.beta += 1
    }

    if (score.mapScores[mapname]) {
      if (winnerteam === 1) {
        score.mapScores[mapname].alpha += 1
      } else if (winnerteam === 2) {
        score.mapScores[mapname].beta += 1
      }
    }
  })

  return score
}
