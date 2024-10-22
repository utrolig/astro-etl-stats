export interface WeaponInfo {
  name: string
  has_headshots: boolean
}

export interface WeaponStats {
  [key: number]: WeaponInfo
}

export interface Weapon {
  id: number
  hits: number
  shots: number
  kills: number
  deaths: number
  headshots: number
  acc: number
  name: string
}

export interface PlayerStats {
  weapons: Weapon[]
  total_shots: number
  total_hits: number
  total_headshots: number
  total_kills: number
  total_deaths: number
  has_stats: boolean
}

const weapon_stats: WeaponStats = {
  0: { name: 'Knife', has_headshots: false },
  1: { name: 'Ka-Bar', has_headshots: false },
  2: { name: 'Luger', has_headshots: true },
  3: {
    name: 'Colt',
    has_headshots: true,
  },
  4: {
    name: 'MP 40',
    has_headshots: true,
  },
  5: {
    name: 'Thompson',
    has_headshots: true,
  },
  6: {
    name: 'Sten',
    has_headshots: true,
  },
  7: {
    name: 'FG 42',
    has_headshots: true,
  },
  8: {
    name: 'Panzer',
    has_headshots: false,
  },
  9: {
    name: 'Bazooka',
    has_headshots: false,
  },
  10: {
    name: 'F.Thrower',
    has_headshots: false,
  },
  11: {
    name: 'Grenade',
    has_headshots: false,
  },
  12: {
    name: 'Mortar',
    has_headshots: false,
  },
  13: {
    name: 'Granatwerf',
    has_headshots: false,
  },
  14: {
    name: 'Dynamite',
    has_headshots: false,
  },
  15: {
    name: 'Airstrike',
    has_headshots: false,
  },
  16: {
    name: 'Artillery',
    has_headshots: false,
  },
  17: {
    name: 'Satchel',
    has_headshots: false,
  },
  18: {
    name: 'G.Launchr',
    has_headshots: false,
  },
  19: {
    name: 'Landmine',
    has_headshots: false,
  },
  20: {
    name: 'MG 42 Gun',
    has_headshots: false,
  },
  21: {
    name: 'Browning',
    has_headshots: false,
  },
  22: {
    name: 'Garand',
    has_headshots: true,
  },
  23: {
    name: 'K43 Rifle',
    has_headshots: true,
  },
  24: {
    name: 'Scp.Garand',
    has_headshots: true,
  },
  25: {
    name: 'Scp.K43',
    has_headshots: true,
  },
  26: {
    name: 'MP 34',
    has_headshots: true,
  },
  27: { name: 'Syringe', has_headshots: false },
}

export function convertWeaponStats(stats: number[]) {
  let argIndex = 1

  const weapons: Weapon[] = []

  for (const k of Object.keys(weapon_stats)) {
    const weaponId = parseInt(k)
    const firstEntry = stats[0]

    if (firstEntry === undefined) {
      throw new Error('Invalid stats')
    }

    if (firstEntry & (1 << weaponId)) {
      const weapon: Weapon = {
        id: weaponId,
        hits: stats[argIndex++] as number,
        shots: stats[argIndex++] as number,
        kills: stats[argIndex++] as number,
        deaths: stats[argIndex++] as number,
        headshots: stats[argIndex++] as number,
        name: weapon_stats[weaponId]?.name as string,
        acc: 0,
      }

      weapon.acc = weapon.shots > 0 ? (weapon.hits * 100) / weapon.shots : 0.0

      weapons.push(weapon)
    }
  }

  return weapons
}
