import utils from "./utils";
import PopulateGrid from "./populateGrid";

// TODO change to object, with NORTH, EAST etc
const directions = ['N', 'E', 'S', 'W'];
const removeDuplicates = (array) => [...new Set(array)];
const flatten = (array) => array.reduce((prev, curr) => prev.concat(curr));


const Grid = {
    newGame: true,
    letters: [],
    rows: 0,
    columns: 0,
    size: 0,
    words: [],
    wordLocations: [],
    locationIndexes: [],
    setup(rows, columns, words) {
        if (this.newGame) {
            this.newGame = false
            this.wordLocations = [];
            this.words = words.map(word => {
                return {word: word, location: [], found: false}
            });
            console.log('words', this.words);
            this.createBlankGrid(rows, columns).populateWords(words).fillBlanks();
        }
        console.log('this in setup', this);
        console.log('this letters', this.letters);
        return this;
    },
    createBlankGrid(rows, columns) {
        console.log('createBlankGrid');
        this.rows = rows;
        this.columns = columns;
        this.size = rows * columns;
        this.letters = new Array(this.size).fill('-');
        return this;
    },
    populateWords(words) {
        // TODO iterate over list of words
        console.log('populateWords');
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let directionFound = false;
            let nextLocation;
            let nextDirection;
            let insertUnsuccessful = true;
            let attempts = 0;
            while (insertUnsuccessful && (attempts++ < this.size)) {
                console.log('attempts', attempts);
                while (directionFound === false) {
                    console.log('grid size', this.size);
                    nextLocation = PopulateGrid.getRandomLocation(this.size);
                    console.log('nextLocation', nextLocation);
                    nextDirection = PopulateGrid.findNextDirection(this, nextLocation, word, directions);
                    console.log('nextDirection', nextDirection);
                    directionFound = nextDirection;
                }
                directionFound = false;
                console.log('word ', word);
                let inserted = PopulateGrid.insertWord(this, nextLocation, nextDirection, word);
                console.log('letters ', this.letters);
                // TODO retry word if it can't be inserted
                if (inserted) {
                    this.locationIndexes = removeDuplicates(flatten(this.wordLocations));
                    insertUnsuccessful = false;
                }
                console.log('locationIndexes', this.locationIndexes);
            }
        }
        return this;
    },
    fillBlanks() {
        this.letters = this.letters
            .map((e, i) => this.locationIndexes.includes(i) ? e : utils.randomLetter());
        console.log('letters after filling blanks', this.letters);
        return this;
    },
};
export default Grid;