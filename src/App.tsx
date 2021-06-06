import { findShortestPath } from 'Algorithm';
import React from 'react'
import styled from 'styled-components'
import 'App.css'
import { CellState, Grid, Row, Value } from 'types'

import { Cell } from './Cell'
import { Row as RowComponent } from './Row'

const NUMBER_OF_ROWS = 20
const NUMBER_OF_COLUMNS = 20

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Header = styled.h3`
  margin: 20px 0;
  color: white;
  text-align: center;
`

const Button = styled.div`
  background-color: #00fc69a4;
  color: white;
  margin: 30px 10px;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-weight: bold;
  padding: 25px;
  cursor: pointer;
  :hover {
    background-color: #00fc699b;
    box-shadow: 0 0 1px #000 inset;
  }
  
`

const ResetButton = styled(Button)`
  background-color: red;
`

const getRandomPoint = () => ({
  x: Math.floor(Math.random() * NUMBER_OF_COLUMNS),
  y: Math.floor(Math.random() * NUMBER_OF_ROWS),
})

const isPoint = (x, y, point) => point.x === x && point.y === y

function App() {

  // const a = [
  //   [0, 0, 0],
  //   [0, 0, 0],
  // ]

  const [grid, setGrid] = React.useState<Grid>([])

  const initializeGrid = React.useCallback(() => {
    const startingPoint = getRandomPoint()
    const destinationPoint = getRandomPoint()
    let _grid: Grid = []
    for (let x = 0; x < NUMBER_OF_ROWS; x++) {
      let row: Row = []
      for (let y = 0; y < NUMBER_OF_COLUMNS; y++) {
        let value: Value = isPoint(x, y, startingPoint)
          ? CellState.INITIAL
          : isPoint(x, y, destinationPoint)
            ? CellState.DESTINATION
            : CellState.UNTOUCHED
        row.push(value)
      }
      _grid.push(row)
    }
    setGrid(_grid)
  }, [])
  // NOTE: initialize the grid
  React.useEffect(initializeGrid, [initializeGrid])

  const findShortestPathHandler = React.useCallback(() => { void findShortestPath(grid) }, [grid])

  return (
    <>
      <Header>Dijkstra's algorithm for finding the shortest path</Header>
      <GridWrapper>
        {grid.map((row, rowIndex) => (
          <RowComponent key={`row-${rowIndex}`}>
            {row.map((cell, columnIndex) => <Cell key={`cell-row${rowIndex}column${columnIndex}`} id={`cell-row${rowIndex}column${columnIndex}`} state={cell} />)}
          </RowComponent>
        ))}
        <ButtonWrapper>
          <Button onClick={findShortestPathHandler}>GO!</Button>
          {/* eslint-disable-next-line no-restricted-globals */}
          <ResetButton onClick={() => {location.reload()}}>RESET</ResetButton>
        </ButtonWrapper>
      </GridWrapper>
    </>
  );
}

export default App;
