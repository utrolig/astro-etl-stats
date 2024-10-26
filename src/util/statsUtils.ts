import type { PlayerStats } from '@/util/aggregateRoundStats'
import { type Weapon } from './convertWeaponStats'

export function getTotalKills(weapons: Weapon[]) {
  return weapons.reduce((totalKills, weapon) => {
    return totalKills + weapon.kills
  }, 0)
}

export function getTotalDeaths(weapons: Weapon[]) {
  return weapons.reduce((totalDeaths, weapon) => {
    return totalDeaths + weapon.deaths
  }, 0)
}

export function getTotalHeadshots(weapons: Weapon[]) {
  return weapons.reduce((totalHeadshots, weapon) => {
    return totalHeadshots + weapon.headshots
  }, 0)
}

export function getTotalDamageGiven(playerStats: PlayerStats[]) {
  return playerStats.reduce((total, stats) => total + stats.damageGiven, 0)
}

export function getTotalDamageReceived(playerStats: PlayerStats[]) {
  return playerStats.reduce((total, stats) => total + stats.damageReceived, 0)
}

export function getTotalGibs(playerStats: PlayerStats[]) {
  return playerStats.reduce((total, stats) => total + stats.gibs, 0)
}

export function getTotalRevives(weaponStats: Weapon[]) {
  return weaponStats.reduce((total, stats) => {
    if (stats.id === 27) {
      return total + stats.hits
    }

    return total
  }, 0)
}

export function getTotalAccuracy(weaponStats: Weapon[]) {
  const totalShots = weaponStats.reduce((total, wpn) => total + wpn.shots, 0)
  const totalHits = weaponStats.reduce((total, wpn) => total + wpn.hits, 0)

  const totalAcc = (totalHits / totalShots) * 100
  return totalAcc.toFixed(1)
}

export function getTotalTimePlayed(playerStats: PlayerStats[]) {
  return playerStats[0]?.playtime
}
