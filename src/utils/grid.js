import utils from "./utils";

const wordLocations = [[0, 1, 2], [2, 5, 8]];
const removeDuplicates = (array) => [...new Set(array)];
const flatten = (array) => array.reduce((prev, curr) => prev.concat(curr))
const locationIndexes = removeDuplicates(flatten(wordLocations));


const Grid = {
    grid: ['F', 'O', 'X', '-', '-', 'O', '-', '-', 'B'],
    createBlankGrid(rows, columns) {
        this.grid = new Array(rows * columns).fill('-');
        return this;
    },
    populateWords(words) {
        this.grid = ['F', 'O', 'X', '-', '-', 'O', '-', '-', 'B'];
        return this;
    },
    fillBlanks(letterLocations) {
        this.grid = this.grid
            .map((e, i) => locationIndexes.includes(i) ? e : utils.randomLetter());
        return this;
    }
};
export default Grid;