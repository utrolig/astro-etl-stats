import { createMemo, createSignal, For } from 'solid-js'
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/solid-table'
import { aggregateWeaponStats } from '@/util/aggregateWeaponStats'
import type { Component } from 'solid-js'
import type { PlayerData } from '@/util/aggregateRoundStats'
import { playerStatsColumnDefs } from '@/components/player-stats/player-stats.column-defs'

export type PlayerStatsProps = {
  data: PlayerData
}

export const PlayerStats: Component<PlayerStatsProps> = (props) => {
  const [sorting, onSortingChange] = createSignal<SortingState>([
    { id: 'kills', desc: true },
  ])
  const stableStats = createMemo(() => {
    return aggregateWeaponStats(props.data.weaponStats)
  })

  const table = createSolidTable({
    get data() {
      return stableStats()
    },
    state: {
      get sorting() {
        return sorting()
      },
    },
    onSortingChange,
    columns: playerStatsColumnDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div class="w-full">
      <For each={table.getHeaderGroups()}>
        {(headerGroup) => (
          <div class="grid grid-cols-playerStats gap-4 py-4 text-etl-text/50">
            <For each={headerGroup.headers}>
              {(header) => (
                <div
                  onClick={header.column.getToggleSortingHandler()}
                  class="flex justify-end px-3 py-1 text-xs"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </div>
              )}
            </For>
          </div>
        )}
      </For>
      <div class="flex flex-col gap-1">
        <For each={table.getSortedRowModel().rows}>
          {(row) => (
            <div class="grid grid-cols-playerStats gap-4 odd:bg-etl-bg-200 even:bg-etl-bg-100">
              <For each={row.getVisibleCells()}>
                {(cell) => (
                  <div class="flex items-center justify-end px-3 py-1 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
