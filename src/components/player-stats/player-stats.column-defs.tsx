import { type Weapon, WEAPON_IDS } from '@/util/convertWeaponStats'
import type { ColumnDef } from '@tanstack/solid-table'

const safePercentage = (value: number, decimals: number) => {
  if (isNaN(value)) {
    return (0).toFixed(decimals)
  }

  const fixed = value.toFixed(decimals)

  return fixed
}

export const playerStatsColumnDefs: ColumnDef<Weapon>[] = [
  {
    id: 'weapon',
    accessorFn: (row) => row.id,
    enableSorting: true,
    cell: (info) => {
      const val = info.getValue()
      const weaponName = WEAPON_IDS[val as number]?.name
      const safeName = weaponName ?? ''

      return <div class="flex flex-1 justify-start">{safeName}</div>
    },
    sortingFn: (a, b) => {
      const aId = Number(a.getValue('weapon'))
      const bId = Number(b.getValue('weapon'))

      const aName = WEAPON_IDS[aId]?.name
      const bName = WEAPON_IDS[bId]?.name

      if (!aName || !bName) {
        return 0
      }

      return aName.localeCompare(bName)
    },
    header: () => <div class="flex flex-1 justify-start">Weapon</div>,
  },
  {
    id: 'accuracy',
    accessorFn: (row) => `${safePercentage(row.acc * 100, 2)}%`,
    enableSorting: true,
    cell: (info) => info.getValue(),
    header: 'Accuracy',
  },
  {
    id: 'hits/shots',
    accessorFn: (row) => `${row.hits}/${row.shots}`,
    enableSorting: true,
    cell: (info) => info.getValue(),
    header: 'Hits/Shots',
  },
  {
    id: 'kills',
    accessorFn: (row) => row.kills,
    enableSorting: true,
    cell: (info) => info.getValue(),
    header: 'Kills',
  },
  {
    id: 'deaths',
    accessorFn: (row) => row.deaths,
    enableSorting: true,
    cell: (info) => info.getValue(),
    header: 'Deaths',
  },
  {
    id: 'hs',
    accessorFn: (row) => row.headshots,
    enableSorting: true,
    cell: (info) => info.getValue(),
    header: 'HS',
  },
]
