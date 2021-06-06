// import {directions} from "./grid"
import PopulateGrid from "./populateGrid";
import populateGridUtils from "./populateGridUtils";
import utils from "./utils";

const words = ["FOX", "BOX", "LOG", "FIG"];
const directions = ['N', 'NE', 'E', 'SE', "S", 'SW', 'W', 'NW'];

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
        console.log('grid size', size);
        const randomLocations = populateGridUtils.getRandomLocations(size);
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let directionFound = false;
            let nextLocation;
            let nextDirection = false;
            let insertUnsuccessful = true;
            let inserted = false;
            // let attempts = 0;
            console.log('word ', word);
            // while (insertUnsuccessful && (attempts++ < size)) {
            while (insertUnsuccessful && (randomLocations.length > 0)) {
                // console.log('attempts', attempts);
                console.log('randomLocations', randomLocations);
                nextLocation = randomLocations.pop();
                console.log('nextLocation', nextLocation);
                let possibleDirections = utils.shuffle(directions);
                while (directionFound === false && possibleDirections.length > 0) {
                    console.log('possibleDirections ', possibleDirections);
                    nextDirection = PopulateGrid.findNextDirection(grid, nextLocation, word, possibleDirections);
                    console.log('nextDirection', nextDirection);
                    directionFound = nextDirection;
                    if(nextDirection){
                        inserted = PopulateGrid.insertWord(grid, nextLocation, nextDirection, word);
                    }
                    // console.log('letters ', grid.letters);
                    // TODO retry word if it can't be inserted in this direction
                    if (inserted) {
                        insertUnsuccessful = false;
                        directionFound = true;
                    } else {
                        directionFound = false;
                        let index = possibleDirections.indexOf(nextDirection);
                        possibleDirections.splice(index, 1);
                    }
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