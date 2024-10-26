import { type Component, createSignal } from 'solid-js'
import {
  createSolidTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/solid-table'
import {
  MATCH_TABLE_COLUMNS_IDS,
  matchTableColumnDefs,
} from '@/components/match-table/match-table.column-defs'
import { aggregateRoundStats } from '@/util/aggregateRoundStats'
import type { GroupDetails } from '@/util/stats-api'
import { TeamTable } from '@/components/team-table/team-table'

export type MatchTableProps = {
  group: GroupDetails
}

export const MatchTable: Component<MatchTableProps> = (props) => {
  const [sorting, onSortingChange] = createSignal<SortingState>([
    { id: MATCH_TABLE_COLUMNS_IDS.KILLS, desc: true },
  ])

  const alphaTable = createSolidTable({
    get data() {
      return aggregateRoundStats(props.group).alpha.players
    },
    state: {
      get sorting() {
        return sorting()
      },
    },
    columns: matchTableColumnDefs,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const betaTable = createSolidTable({
    get data() {
      return aggregateRoundStats(props.group).beta.players
    },
    state: {
      get sorting() {
        return sorting()
      },
    },
    columns: matchTableColumnDefs,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div class="flex flex-col gap-4 bg-etl-bg p-8">
      <TeamTable data={alphaTable} />
      <TeamTable data={betaTable} />
    </div>
  )
}
