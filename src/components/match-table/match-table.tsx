import { type Component, createMemo, createSignal, Show } from 'solid-js'
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
import { SectionSubTitle } from '@/components/section-sub-title/section-sub-title'
import { TeamTable } from '@/components/team-table/team-table'
import { Toggle } from '@/components/toggle/toggle'

export type MatchTableProps = {
  group: GroupDetails
}

export const MatchTable: Component<MatchTableProps> = (props) => {
  const [sorting, onSortingChange] = createSignal<SortingState>([
    { id: MATCH_TABLE_COLUMNS_IDS.KILLS, desc: true },
  ])

  const aggregatedStats = createMemo(() => {
    return aggregateRoundStats(props.group)
  })

  const allPlayerStats = createMemo(() => {
    const s = aggregatedStats()
    return [...s.alpha.players, ...s.beta.players]
  })

  const alphaTable = createSolidTable({
    get data() {
      return aggregatedStats().alpha.players
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
      return aggregatedStats().beta.players
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
      <div class="flex flex-col gap-2">
        <SectionSubTitle>Alpha</SectionSubTitle>
        <TeamTable table={alphaTable} />
      </div>
      <div class="flex flex-col gap-2">
        <SectionSubTitle>Beta</SectionSubTitle>
        <TeamTable table={betaTable} />
      </div>
    </div>
  )
}
