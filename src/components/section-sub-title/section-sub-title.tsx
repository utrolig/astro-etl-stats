import type { Component, JSXElement } from 'solid-js'

export type SectionSubTitleProps = {
  children: JSXElement
}

export const SectionSubTitle: Component<SectionSubTitleProps> = (props) => {
  return <h1 class="text-lg font-bold">{props.children}</h1>
}
