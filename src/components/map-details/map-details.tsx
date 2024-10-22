import type { Component } from "solid-js";

export type MapDetailsProps = {
  map: string;
};

export const MapDetails: Component<MapDetailsProps> = (props) => {
  return <div>Hello from solid-js {props.map}</div>;
};
