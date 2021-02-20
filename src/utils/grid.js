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
    createBlankGrid(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.size = rows * columns;
        this.letters = new Array(this.size).fill('-');
        return this;
    },
    populateWords(words) {
        // TODO iterate over list of words
        const nextLocation = PopulateGrid.getRandomLocation(this.size);
        const nextDirection = PopulateGrid.findNextDirection(this, nextLocation, 'FOX', directions);
        // TODO update locations when inserting words
        PopulateGrid.insertWord(this, 0, 'S', 'FOX');
        // PopulateGrid.insertWord(grid, 1, 'S', 'FOX');
        PopulateGrid.insertWord(this, 8, 'W', 'BOX');
        //PopulateGrid.insertWord(grid, 8, 'N', 'FOX');
        // words.forEach( word => {
        //     const candidateLocation = PopulateGrid.getRandomLocation(this.size);
        //     const startLocation = selectSNextStartLocation(word);
        //     this.letters.splice(startLocation, word.length, ...word);
        //     this.wordLocations = [[0,1,2]];
        //
        // });
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