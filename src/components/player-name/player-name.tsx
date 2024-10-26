import { type Component, createMemo, For } from 'solid-js'
import { getColoredNameParts } from '@/util/coloredNames'

export type PlayerNameProps = {
  name: string | undefined
}

export const PlayerName: Component<PlayerNameProps> = (props) => {
  const parts = createMemo(() => {
    if (!props.name) {
      return []
    }
    return getColoredNameParts(props.name)
  })

  return (
    <div class="inline-flex items-center">
      <For each={parts()}>
        {({ text, color }) => <span style={{ color }}>{text}</span>}
      </For>
    </div>
  )
}
