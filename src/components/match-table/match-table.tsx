import type { Component } from 'solid-js'
import type { GroupDetails } from '@/util/stats-api'

export type MatchTableProps = {
  group: GroupDetails
}

export const MatchTable: Component<MatchTableProps> = (props) => {
  return <div>Match tabel!</div>
}
