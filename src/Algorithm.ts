import { sleep } from "AsyncUtils"
import { CellState, Grid, Node } from "types"

const getId = (row: number, column: number) => `cell-row${row}column${column}`

const getNeighbours = (nodeList: Node[], currentNode: Node): Node[] => nodeList.reduce((neighbours: Node[], node) => {
  if (
    (node.x === currentNode.x - 1 && node.y === currentNode.y) ||
    (node.x === currentNode.x + 1 && node.y === currentNode.y) ||
    (node.y === currentNode.y - 1 && node.x === currentNode.x) ||
    (node.y === currentNode.y + 1 && node.x === currentNode.x)
  ) {
    neighbours.push({
      ...node,
      parent: currentNode,
    })
  }
  return neighbours
}, [])

export const findShortestPath = async (grid: Grid) => {
  // TODO: use document.getElementById() to add classNames
    // step 1 + 2
    let unvisitedSet: Node[] = grid.reduce((set: Node[], row, rowIndex) => {
      set.push(
        ...row
          .map((cell, columnIndex) => ({
            x: rowIndex,
            y: columnIndex,
            distance: cell === CellState.INITIAL ? 0 : Infinity,
            state: cell === CellState.INITIAL ? CellState.CURRENT : cell,
            id: getId(rowIndex, columnIndex),
            parent: null,
          }))
      )
      return set
    }, []);
    let fullSet: Node[] = [...unvisitedSet]
    // step 3 - start loop
    while (unvisitedSet.length > 0) {
      const currentNode = unvisitedSet.find(node => node.state === CellState.CURRENT)
      let neighbours: Node[]
      if (currentNode) {
        neighbours = getNeighbours(unvisitedSet, currentNode)
        neighbours = neighbours.map(neighbour => ({
          ...neighbour,
          distance: currentNode.distance + 1 < neighbour.distance
            ? currentNode.distance + 1
            : neighbour.distance
        }))

        unvisitedSet = unvisitedSet.map(node => neighbours.find(neighbour => neighbour.id === node.id) ?? node)
        fullSet = fullSet.map(node => neighbours.find(neighbour => neighbour.id === node.id) ?? node)
        
        console.log(neighbours);
        // neighbours.forEach(neighbour => {document.getElementById(neighbour.id)?.classList.add('visited')})
        // step 4 - set current as visited
        document.getElementById(currentNode.id)?.classList.add('visited')
        await sleep(25)
        unvisitedSet = unvisitedSet.filter(node => node.id !== currentNode.id)
        fullSet = fullSet.map(node => ({
          ...node,
          state: node.state === CellState.CURRENT ? CellState.VISITED : node.state
        }))

        unvisitedSet.sort((a, b) => a.distance - b.distance)
        const nextNode = unvisitedSet[0]
        if (nextNode) {
          if (nextNode.state === CellState.DESTINATION) {
            console.log(fullSet)
            const shortestPath: Node[] = []
            let parentNode = nextNode.parent
            while (parentNode) {
              shortestPath.push(parentNode)
              parentNode = parentNode?.parent
            }
            shortestPath.forEach(node => document.getElementById(node.id)?.classList.add('found'))
            console.log(shortestPath)
            break
          }
          if (nextNode.distance === Infinity) {
            break
          }
          nextNode.state = CellState.CURRENT
        }
      }
    }

    // TODO: zoradi?? fullset a printnu?? od najmen??ej distance po destination

    // console.log(unvisitedSet)
    // TODO: set initial node state from visited to initial
}