import gridSetup from "./gridSetup";

// TODO change to object, with NORTH, EAST etc
export const directions = ['N', 'E', 'S', 'W'];

const Grid = {
    buildNewGrid: (rows, columns) => {
        let grid = gridSetup.createBlankGrid(rows, columns);
        grid = gridSetup.insertWordsIntoGrid(grid, gridSetup.getWords());
        grid = gridSetup.fillBlanks(grid);
        return grid;
    },
};
export default Grid;