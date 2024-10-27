import { type Component, For } from 'solid-js'
import { flexRender, type Table } from '@tanstack/solid-table'
import Accordion from '@corvu/accordion'
import { getMatchTableCellAlignmentClass } from '@/components/match-table/match-table.column-defs'
import type { PlayerData } from '@/util/aggregateRoundStats'
import { PlayerStats } from '@/components/player-stats/player-stats'

export type TeamTableProps = {
  table: Table<PlayerData>
}

export const TeamTable: Component<TeamTableProps> = (props) => {
  return (
    <div class="w-full">
      <For each={props.table.getHeaderGroups()}>
        {(headerGroup) => (
          <div class="grid grid-cols-matchTable gap-4 p-2">
            <For each={headerGroup.headers}>
              {(header) => (
                <div
                  onClick={header.column.getToggleSortingHandler()}
                  class={`flex text-xs ${getMatchTableCellAlignmentClass(header.column.columnDef.id)}`}
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
      <div class="flex flex-col">
        <For each={props.table.getSortedRowModel().rows}>
          {(row) => (
            <Accordion collapseBehavior="hide">
              <div class="odd:bg-etl-bg-200 even:bg-etl-bg-100">
                <Accordion.Item>
                  <Accordion.Trigger
                    class="grid grid-cols-matchTable gap-4 p-2 "
                    as="div"
                  >
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <div
                          class={`flex items-center ${getMatchTableCellAlignmentClass(cell.column.columnDef.id)}`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      )}
                    </For>
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <div class="p-8">
                      <PlayerStats data={row.original} />
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </div>
            </Accordion>
          )}
        </For>
      </div>
    </div>
  )
}
