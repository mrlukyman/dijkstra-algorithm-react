export enum CellState {
  UNTOUCHED,
  CURRENT,
  VISITED,
  FOUND, // path to destination
  INITIAL,
  DESTINATION,
}

export type Value = CellState
export type Row = Value[]
export type Grid = Row[]

export type Node = {
  x: number,
  y: number,
  distance: number,
  state: CellState,
  id: string,
}