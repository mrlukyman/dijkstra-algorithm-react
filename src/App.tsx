import { findShortestPath } from 'Algorithm';
import React from 'react'
import styled from 'styled-components'
import 'App.css'
import { CellState, Grid, Row, Value } from 'types'

import { Cell } from './Cell'
import { Row as RowComponent } from './Row'

const NUMBER_OF_ROWS = 10
const NUMBER_OF_COLUMNS = 10

const POINT_A = {x: 2, y: 1}
const POINT_B = {x: 6, y: 5}

const isPointA = (x: number, y: number) => (x === POINT_A.x && y === POINT_A.y)
const isPointB = (x: number, y: number) => (x === POINT_B.x && y === POINT_B.y)

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  max-width: 1024px;
  display: flex;
  flex-direction: column;
`

const Menu = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const Button = styled.div`
  background-color: #00fc69a4;
  color: white;
  margin: 30px 0;
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

function App() {

  // const a = [
  //   [0, 0, 0],
  //   [0, 0, 0],
  // ]

  const [grid, setGrid] = React.useState<Grid>([])

  // NOTE: initialize the grid
  React.useEffect(() => {
    let _grid: Grid = []
    for (let x = 0; x < NUMBER_OF_ROWS; x++) {
      let row: Row = []
      for (let y = 0; y < NUMBER_OF_COLUMNS; y++) {
        let value: Value = isPointA(x, y)
          ? CellState.INITIAL
          : isPointB(x, y)
            ? CellState.DESTINATION
            : CellState.UNTOUCHED
        row.push(value)
      }
      _grid.push(row)
    }
    setGrid(_grid)
  }, [])

  const findShortestPathHandler = React.useCallback(() => { void findShortestPath(grid) }, [grid])

  return (
    <>
      <Menu>
        <h3>Dijkstra's algorithm for finding the shortest path</h3>
      </Menu>
      <GridWrapper>
        {grid.map((row, rowIndex) => (
          <RowComponent key={`row-${rowIndex}`}>
            {row.map((cell, columnIndex) => <Cell key={`cell-row${rowIndex}column${columnIndex}`} id={`cell-row${rowIndex}column${columnIndex}`} state={cell} />)}
          </RowComponent>
        ))}
        <Button onClick={findShortestPathHandler}>GO!</Button>
      </GridWrapper>
    </>
  );
}

export default App;
