import { type Component, Show } from 'solid-js'
import { Switch } from '@kobalte/core/switch'

export type ToggleProps = {
  onChange: (value: boolean) => void
  label?: string
  value: boolean
}

export const Toggle: Component<ToggleProps> = (props) => {
  return (
    <Switch
      class="inline-flex items-center"
      checked={props.value}
      onChange={props.onChange}
    >
      <Show when={props.label}>
        <Switch.Label class="mr-1 text-sm text-etl-text/50">
          {props.label}
        </Switch.Label>
      </Show>
      <Switch.Input class="group" />
      <Switch.Control class="inline-flex h-6 w-11 items-center rounded-xl border border-etl-bg-200 bg-etl-bg-100 group-focus-visible:outline-etl-200 data-[checked]:border-transparent data-[checked]:bg-etl-400">
        <Switch.Thumb class="size-5 translate-x-px rounded-full bg-white transition-transform data-[checked]:translate-x-full" />
      </Switch.Control>
    </Switch>
  )
}
