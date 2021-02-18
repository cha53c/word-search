import utils from "./utils";
import PopulateGrid from "./populateGrid";

// const wordLocations = [[0, 1, 2], [2, 5, 8]];
const removeDuplicates = (array) => [...new Set(array)];
const flatten = (array) => array.reduce((prev, curr) => prev.concat(curr))
//const locationIndexes = removeDuplicates(flatten(wordLocations));
const selectSNextStartLocation = () => 0;


const Grid = {
    letters: ['F', 'O', 'X', '-', '-', 'O', '-', '-', 'B'],
    row: 0,
    columns: 0,
    size: 0,
    wordLocations: [],
    locationIndexes: [],
    createBlankGrid(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.size = rows * columns;
        this.letters = new Array(this.size).fill('-');
        return this;
    },
    populateWords(words) {
        words.forEach( word => {
            const candidateLocation = PopulateGrid.getRandomLocation(this.size);
            const startLocation = selectSNextStartLocation(word);
            this.letters.splice(startLocation, word.length, ...word);
            this.wordLocations = [[0,1,2]];

        });
        this.locationIndexes = removeDuplicates(flatten(this.wordLocations));
        return this;
    },
    fillBlanks(letterLocations) {
        this.letters = this.letters
            .map((e, i) => this.locationIndexes.includes(i) ? e : utils.randomLetter());
        return this;
    },
};
export default Grid;