import type { Weapon } from '@/util/convertWeaponStats'

export function aggregateWeaponStats(weapons: Weapon[]) {
  return weapons.reduce((total, weapon) => {
    const prevEntry = total.find((s) => s.id === weapon.id)

    if (prevEntry) {
      prevEntry.hits = prevEntry.hits + weapon.hits
      prevEntry.kills = prevEntry.kills + weapon.kills
      prevEntry.shots = prevEntry.shots + weapon.shots
      prevEntry.deaths = prevEntry.deaths + weapon.deaths
      prevEntry.headshots = prevEntry.headshots + weapon.headshots

      prevEntry.acc = prevEntry.hits / prevEntry.shots
    } else {
      total.push(weapon)
    }

    return total
  }, [] as Weapon[])
}
