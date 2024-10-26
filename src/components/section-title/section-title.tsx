import type { Component, JSXElement } from 'solid-js'

export type SectionTitleProps = {
  children: JSXElement
}

export const SectionTitle: Component<SectionTitleProps> = (props) => {
  return <h1 class="text-2xl font-bold">{props.children}</h1>
}
