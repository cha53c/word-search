import {directions} from "./grid"
import PopulateGrid from "./populateGrid";
import utils from "./utils";

const words = ["FOX", "BOX", "LOG", "FIG"];

const gridSetup = {
    getWords: () => words,
    createBlankGrid: (rows, columns) => {
        console.log('createBlankGrid');
        const grid = {};
        grid.rows = rows;
        grid.columns = columns;
        grid.size = rows * columns; // TODO do I need this? can it just be calculated each time?
        grid.letters = new Array(rows * columns).fill('-');
        grid.selectedLocations = [];
        grid.gameComplete = false;
        grid.words = [];
        return grid;
    },
    setWords: (grid, words) => {
        grid.words = words.map(word => {
            return {word: word, location: [], found: false}
        });
        return grid;
    },
    insertWordsIntoGrid: (grid, words) => {
        // TODO iterate over list of words
        grid.words = words.map(word => {
            return {word: word, location: [], found: false}
        });
        console.log('populateWords');
        const size = grid.rows * grid.columns;
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let directionFound = false;
            let nextLocation;
            let nextDirection;
            let insertUnsuccessful = true;
            let attempts = 0;
            while (insertUnsuccessful && (attempts++ < size)) {
                console.log('attempts', attempts);
                while (directionFound === false) {
                    console.log('grid size', size);
                    nextLocation = PopulateGrid.getRandomLocation(size);
                    console.log('nextLocation', nextLocation);
                    nextDirection = PopulateGrid.findNextDirection(grid, nextLocation, word, directions);
                    console.log('nextDirection', nextDirection);
                    directionFound = nextDirection;
                }
                directionFound = false;
                console.log('word ', word);
                let inserted = PopulateGrid.insertWord(grid, nextLocation, nextDirection, word);
                console.log('letters ', grid.letters);
                // TODO retry word if it can't be inserted
                if (inserted) {
                    insertUnsuccessful = false;
                }
            }
        }
        return grid;
    },
    fillBlanks: (grid) => {
        const locationIndexes = utils.removeDuplicates(utils.flatten(grid.words));
        grid.letters = grid.letters
            .map((e, i) => locationIndexes.includes(i) ? e : utils.randomLetter());
        console.log('letters after filling blanks', grid.letters);
        return grid;
    },
};

export default gridSetup;