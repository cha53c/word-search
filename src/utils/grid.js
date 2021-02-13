import utils from "./utils";

// const wordLocations = [[0, 1, 2], [2, 5, 8]];
const removeDuplicates = (array) => [...new Set(array)];
const flatten = (array) => array.reduce((prev, curr) => prev.concat(curr))
//const locationIndexes = removeDuplicates(flatten(wordLocations));
const selectSNextStartLocation = () => 0;


const Grid = {
    grid: ['F', 'O', 'X', '-', '-', 'O', '-', '-', 'B'],
    wordLocations: [],
    locationIndexes: [],
    createBlankGrid(rows, columns) {
        this.grid = new Array(rows * columns).fill('-');
        return this;
    },
    populateWords(words) {
        words.forEach( word => {
            const startLocation = selectSNextStartLocation(word);
            this.grid.splice(startLocation, word.length, ...word);
            this.wordLocations = [[0,1,2]];

        });
        this.locationIndexes = removeDuplicates(flatten(this.wordLocations));
        return this;
    },
    fillBlanks(letterLocations) {
        this.grid = this.grid
            .map((e, i) => this.locationIndexes.includes(i) ? e : utils.randomLetter());
        return this;
    },
};
export default Grid;