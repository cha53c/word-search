import Grid from "./grid";
import PopulateGrid from "./populateGrid";

const wordLocations = [[0, 1, 2], [2, 5, 8]];
const directions = ['N', 'E', 'S', 'W'];
const rows = 3, columns = 3;
const words = ["FOX", "BOX"];
const removeDuplicates = (array) => [...new Set(array)];
const flatten = (array) => array.reduce((prev, curr) => prev.concat(curr))
const locationIndexes = removeDuplicates(flatten(wordLocations));

const gridSetup = {
    getWords: () => words,
    getGrid: () => {
        const grid = Grid.setup(rows, columns, words);
        return grid.letters;
    },
    // getWordLocations: () => wordLocations,
};

export default gridSetup;