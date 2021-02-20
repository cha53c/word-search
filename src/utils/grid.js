import utils from "./utils";
import PopulateGrid from "./populateGrid";

// TODO ahange to object, with NORTH, EAST etc
const directions = ['N', 'E', 'S', 'W'];
const removeDuplicates = (array) => [...new Set(array)];
const flatten = (array) => array.reduce((prev, curr) => prev.concat(curr))
//const locationIndexes = removeDuplicates(flatten(wordLocations));


const Grid = {
    letters: [],
    row: 0,
    columns: 0,
    size: 0,
    wordLocations: [],
    locationIndexes: [],
    setup(rows, columns, words) {
        this.createBlankGrid(rows, columns).populateWords(words).fillBlanks();
        return this;
    },
    createBlankGrid(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.size = rows * columns;
        this.letters = new Array(this.size).fill('-');
        return this;
    },
    populateWords(words) {
        // TODO iterate over list of words
        words.forEach(word => {
            let directionFound = false;
            let nextLocation;
            let nextDirection;
            while (directionFound === false) {
                console.log('grid size', this.size);
                nextLocation = PopulateGrid.getRandomLocation(this.size);
                console.log('nextLocation', nextLocation);
                nextDirection = PopulateGrid.findNextDirection(this, nextLocation, word, directions);
                console.log('nextDirection', nextDirection);
                directionFound = nextDirection;
            }
            PopulateGrid.insertWord(this, nextLocation, nextDirection, word);
        });
        this.locationIndexes = removeDuplicates(flatten(this.wordLocations));
        console.log('letters ', this.letters);
        return this;
    },
    fillBlanks(letterLocations) {
        this.letters = this.letters
            .map((e, i) => this.locationIndexes.includes(i) ? e : utils.randomLetter());
        return this;
    },
};
export default Grid;