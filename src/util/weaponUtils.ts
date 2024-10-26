import type { Weapon } from './convertWeaponStats'

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
