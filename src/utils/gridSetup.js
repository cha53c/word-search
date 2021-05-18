import Grid from "./grid";
import PopulateGrid from "./populateGrid";

// const wordLocations = [[0, 1, 2], [2, 5, 8]];
// const directions = ['N', 'E', 'S', 'W'];
// const rows = 3, columns = 3;
const words = ["FOX", "BOX", "LOG", "FIG"];
// const removeDuplicates = (ar                ray) => [...new Set(array)];
// const flatten = (array) => array.reduce((prev, curr) => prev.concat(curr))
// const locationIndexes = removeDuplicates(flatten(wordLocations));

const gridSetup = {
    getWords: () => words,
    greatBlankGrid: (rows, columns) => {
        console.log('createBlankGrid');
        const grid = {};
        grid.rows = rows;
        grid.columns = columns;
        grid.size = rows * columns; // TODO do I need this? can it just be calculated each time?
        grid.letters = new Array(rows * columns).fill('-');
        grid.gameComplete = false;
        grid.words = [];
        grid.wordLocations = [];
        grid.locationIndexe = [];
        return grid;
    },
};

export default gridSetup;