import Grid from "./grid";
import PopulateGrid from "./populateGrid";

// const directions = ['N', 'E', 'S', 'W'];
// const rows = 3, columns = 3;
const words = ["FOX", "BOX", "LOG", "FIG"];

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
    addWords: (grid, words) => {
         grid.words = words.map(word => {
            return {word: word, location: [], found: false}
        });
        return grid;
    },
};

export default gridSetup;