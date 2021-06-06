import React from 'react'
import styled from 'styled-components'
import { CellState } from 'types'

type Props = {
  state: CellState
  id: string
}

const Container = styled.div<Props>`
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
  margin: 3px;
  max-width: 1024px;
  box-shadow: 0 0 1px inset;
  background-color: ${props =>
    props.state === CellState.CURRENT
      ? 'green'
      : props.state === CellState.VISITED
        ? '#EF476F'
        : props.state === CellState.INITIAL
          ? '#26547C'
          : props.state === CellState.FOUND
            ? 'black'
            : props.state === CellState.DESTINATION
              ? '#FFD166'
              : '#18344D'
  };
`

export const Cell = (props: Props) => {
  return <Container state={props.state} id={props.id} />
}
