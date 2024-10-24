import {
  aggregateRoundStats,
  type PlayerData,
} from '@/util/aggregateRoundStats'
import {
  type ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/solid-table'
import { type Component, createEffect, createSignal, For } from 'solid-js'
import { getColoredNameParts } from '@/util/coloredNames'
import { getTotalKills } from '@/util/weaponUtils'
import type { GroupDetails } from '@/util/stats-api'

const columns: ColumnDef<PlayerData>[] = [
  {
    accessorFn: (row) => row.name,
    enableSorting: true,
    id: 'name',
    cell: (info) => {
      const parts = getColoredNameParts(info.getValue<string>())

      return (
        <For each={parts}>
          {({ text, color }) => <span style={{ color }}>{text}</span>}
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
    accessorFn: (row) => getTotalKills(row.weaponStats),
    enableSorting: true,
    cell: (info) => info.getValue(),
    header: 'Kills',
  },
]

export type MatchTableProps = {
  group: GroupDetails
}

export const MatchTable: Component<MatchTableProps> = (props) => {
  const [sorting, onSortingChange] = createSignal<SortingState>([])

  createEffect(() => {
    console.log('sorting', sorting())
  })

  const table = createSolidTable({
    get data() {
      return aggregateRoundStats(props.group).alpha.players
    },
    state: {
      get sorting() {
        return sorting()
      },
    },
    columns,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div class="p-2">
      <table>
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th>
                      <div onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody>
          <For each={table.getSortedRowModel().rows}>
            {(row) => (
              <tr>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
        <tfoot>
          <For each={table.getFooterGroups()}>
            {(footerGroup) => (
              <tr>
                <For each={footerGroup.headers}>
                  {(header) => (
                    <th>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tfoot>
      </table>
    </div>
  )
}
