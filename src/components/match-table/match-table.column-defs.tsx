import { For, Show } from 'solid-js'
import {
  getKdr,
  getTotalAccuracy,
  getTotalDamageGiven,
  getTotalDamageReceived,
  getTotalDeaths,
  getTotalHeadshots,
  getTotalKills,
  getTotalRevives,
  getTotalTimePlayed,
} from '@/util/statsUtils'
import type { ColumnDef } from '@tanstack/solid-table'
import { getColoredNameParts } from '@/util/coloredNames'
import type { PlayerData } from '@/util/aggregateRoundStats'

export const MATCH_TABLE_COLUMNS_IDS = {
  KDR: 'kdr',
  NAME: 'name',
  KILLS: 'kills',
  DEATHS: 'deaths',
  DAMAGE_GIVEN: 'damage_given',
  DAMAGE_RECEIVED: 'damage_received',
  HEADSHOTS: 'headshots',
  REVIVES: 'revives',
  ACCURACY: 'accuracy',
  TIME_PLAYED: 'time_played',
} as const

export const getMatchTableCellAlignmentClass = (columnId?: string) => {
  if (!columnId) {
    return 'justify-end'
  }

  const col =
    columnId as (typeof MATCH_TABLE_COLUMNS_IDS)[keyof typeof MATCH_TABLE_COLUMNS_IDS]

  switch (col) {
    case 'name': {
      return 'justify-start'
    }
    default: {
      return 'justify-end'
    }
  }
}

export const matchTableColumnDefs: ColumnDef<PlayerData>[] = [
  {
    accessorFn: (row) => row.name,
    enableSorting: true,
    id: MATCH_TABLE_COLUMNS_IDS.NAME,
    cell: (info) => {
      const parts = getColoredNameParts(info.getValue<string>())

      return (
        <For each={parts}>
          {({ text, color }) => (
            <span class="font-semibold" style={{ color }}>
              {text}
            </span>
          )}
        </For>
      )
    },
    sortingFn: (a, b) => {
      const aName = getColoredNameParts(a.getValue('name'))
        .map((part) => part.text)
        .join('')
      const bName = getColoredNameParts(b.getValue('name'))
        .map((part) => part.text)
        .join('')

      return aName.localeCompare(bName)
    },
    header: 'Name',
  },
  {
    accessorFn: (row) => getKdr(row.weaponStats),
    enableSorting: true,
    cell: (info) => {
      const val = info.getValue() as number

      const num = Number(val)

      const formatted = val.toFixed(2)

      return (
        <Show
          when={num > 1}
          fallback={<span class="text-red-700">{formatted}</span>}
        >
          <span class="text-green-700">{formatted}</span>
        </Show>
      )
    },
    header: 'KDR',
    id: MATCH_TABLE_COLUMNS_IDS.KDR,
  },
  {
    accessorFn: (row) => getTotalKills(row.weaponStats),
    enableSorting: true,
    cell: (info) => info.getValue(),
    header: 'Kills',
    id: MATCH_TABLE_COLUMNS_IDS.KILLS,
  },
  {
    accessorFn: (row) => getTotalDeaths(row.weaponStats),
    enableSorting: true,
    cell: (info) => info.getValue(),
    header: 'Deaths',
    id: MATCH_TABLE_COLUMNS_IDS.DEATHS,
  },
  {
    accessorFn: (row) => getTotalDamageGiven(row.playerStats),
    enableSorting: true,
    cell: (info) => (
      <span class="hidden text-green-700 lg:inline">
        {info.getValue() as string}
      </span>
    ),
    header: () => <span class="hidden lg:inline">Damage given</span>,
    id: MATCH_TABLE_COLUMNS_IDS.DAMAGE_GIVEN,
  },
  {
    accessorFn: (row) => getTotalDamageReceived(row.playerStats),
    enableSorting: true,
    cell: (info) => (
      <span class="hidden text-red-700 lg:inline">
        {info.getValue() as string}
      </span>
    ),
    header: () => <span class="hidden lg:inline">Damage received</span>,
    id: MATCH_TABLE_COLUMNS_IDS.DAMAGE_RECEIVED,
  },
  {
    accessorFn: (row) => getTotalHeadshots(row.weaponStats),
    enableSorting: true,
    cell: (info) => (
      <span class="hidden lg:inline">{info.getValue() as string}</span>
    ),
    header: () => <span class="hidden lg:inline">Headshots</span>,
    id: MATCH_TABLE_COLUMNS_IDS.HEADSHOTS,
  },
  {
    accessorFn: (row) => getTotalRevives(row.weaponStats),
    enableSorting: true,
    cell: (info) => (
      <span class="hidden lg:inline">{info.getValue() as string}</span>
    ),
    header: () => <span class="hidden lg:inline">Revives</span>,
    id: MATCH_TABLE_COLUMNS_IDS.REVIVES,
  },
  {
    accessorFn: (row) => `${getTotalAccuracy(row.weaponStats).toFixed(1)}%`,
    enableSorting: true,
    cell: (info) => (
      <span class="hidden lg:inline">{info.getValue() as string}</span>
    ),
    header: () => <span class="hidden lg:inline">Acc</span>,
    id: MATCH_TABLE_COLUMNS_IDS.ACCURACY,
  },
  {
    accessorFn: (row) => `${getTotalTimePlayed(row.playerStats).toFixed(1)}%`,
    enableSorting: true,
    cell: (info) => (
      <span class="hidden lg:inline">{info.getValue() as string}</span>
    ),
    header: () => <span class="hidden lg:inline">TMP</span>,
    id: MATCH_TABLE_COLUMNS_IDS.TIME_PLAYED,
  },
]
