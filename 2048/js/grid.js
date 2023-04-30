import {Cell} from "./cell.js";

let GRID_SIZE;
let CELLS_COUNT = GRID_SIZE * GRID_SIZE;
export class Grid{
     constructor(gridElement,size){
          GRID_SIZE = size;
          this.cells = [];
          for (let i = 0; i < GRID_SIZE; i++) {
               for (let j = 0; j < GRID_SIZE; j++) {
                    this.cells.push(new Cell(gridElement, i, j));
               }
          }

          this.cellsGroupedByColumn = this.groupCellsByColumn();
          this.cellsGroupedByRevercedColumn = this.cellsGroupedByColumn.map(column => [...column].reverse());
          this.cellsGroupedByRow = this.groupCellsByRow();
          this.cellsGroupedByRevercedRow = this.cellsGroupedByRow.map(row => [...row].reverse());

     }
     getRandomEmptyCell(){
          const emptyCells = this.cells.filter(cell => cell.isEmpty());
          const randomCellIndex =  Math.floor(Math.random()*emptyCells.length);
          return emptyCells[randomCellIndex];
     }

     groupCellsByColumn() {
          return this.cells.reduce((groupedCells, cell) => {
               groupedCells[cell.x] = groupedCells[cell.x] || [];
               groupedCells[cell.x][cell.y] = cell;
               return groupedCells;
          }, []);
     }
     groupCellsByRow() {
          return this.cells.reduce((groupedCells, cell) => {
               groupedCells[cell.y] = groupedCells[cell.y] || [];
               groupedCells[cell.y][cell.x] = cell;
               return groupedCells;
          }, []);
     }
}