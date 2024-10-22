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
