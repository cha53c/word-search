import utils from "./utils";
import populateGridUtils from "./populateGridUtils";
const PopulateGrid = {
    getRandomDirection(directions) {
        if (directions.length === 1) {
            return directions[0];
        }
        return directions[Math.floor(Math.random() * directions.length)];
    },
    // TODO write more tests for this
    findNextDirection(grid, position, word, directions) {
        // TODO change to forEach
        while (directions.length > 0) {
            const candidateDirection = directions[0];
            const directionOK = this.checkDirections(candidateDirection, grid.rows, grid.columns, position, word.length);
            if (directionOK) {
                return candidateDirection;
            } else {
                directions.splice(0, 1);
                console.log('direction not usable ');
                console.log('directions updated', directions);
            }
        }
        return false;
    },
    insertWord(grid, position, direction, word) {
        console.log('insertWord: ', word, ' location: ', position, 'direction: ', direction);
        const letters = [...word];
        let letterLocations = [];
        let currentPosition = position;
        let collision = false;
        for (let i = 0; i < letters.length; i++) {
            if (this.collisionDetections(grid, letters[i], currentPosition)) {
                collision = true;
                letterLocations = [];
            }
            if (collision) {
                break;
            }
            letterLocations.push(currentPosition);
            currentPosition = this.calculateNextPosition(grid, direction, currentPosition);
        }
        // letters.forEach(letter => {
        //     if (this.collisionDetections(grid, letter, currentPosition)) {
        //         collision = true;
        //     }
        //     if (collision) {
        //         return
        //     }
        //     letterLocations.push(currentPosition);
        //     grid.letters[currentPosition] = letter;
        //     currentPosition = this.calculateNextPosition(grid, direction, currentPosition);
        // });
        if (collision) {
            console.log('collision detected');
            return false;
        } else {
            console.log('no collisions');
            console.log('adding letters to grid');
            // TODO use functional method instead of for loop
            for (let i = 0; i < letters.length; i++) {
                grid.letters[letterLocations[i]] = letters[i];
            }
            console.log('this.words', grid.words);
            grid.words.find(e => e.word === word).location = letterLocations;
            console.log('words after location added ', grid.words);
            return true
        }
    },
    collisionDetections(grid, letter, location) {
        const locationIndexes = utils.removeDuplicates(utils.flatten(grid.words));
        if (locationIndexes.includes(location)) {
            //if the letters are the same then it's not a collision
            return letter !== grid.letters[location];
        }
    },
    calculateNextPosition(grid, direction, currentPosition) {
        switch (direction) {
            case 'N':
                return currentPosition - grid.columns;
            case 'NE':
                return currentPosition - (grid.columns - 1);
            case 'E':
                return currentPosition + 1;
            case 'SE':
                return currentPosition + (grid.columns + 1)
            case 'S':
                return currentPosition + grid.columns;
            case 'SW':
                return currentPosition + (grid.columns - 1);
            case 'W':
                return currentPosition - 1;
            case 'NW':
                return currentPosition - (grid.columns + 1);
        }
    },
    // checks the word does not go outside the grid
    checkDirections(direction, rows, columns, position, wordLen) {
        let wordEnd;
        let rowEnd;
        let currentRow;
        // TODO improve readability of these checks with functional programming
        switch (direction) {
            case 'N':
                if (position - ((wordLen - 1) * columns) >= 0) {
                    return true;
                }
                return false;
            case 'NE':
                currentRow = populateGridUtils.currentRow(position, columns);
                wordEnd = position - ((wordLen - 1) * (columns - 1))
                rowEnd = ((currentRow - (wordLen - 1)) * columns) - 1;
                if (wordEnd < 0 || wordEnd > rowEnd) {
                    return false;
                }
                return true;
            case 'E':
                rowEnd = position - (position % columns) + (columns - 1);
                if (position + (wordLen - 1) > rowEnd) {
                    return false;
                }
                return true;
            case 'SE':
                currentRow = populateGridUtils.currentRow(position, columns);
                wordEnd = position + ((wordLen - 1) * (columns + 1));
                rowEnd = ((currentRow + (wordLen - 1)) * columns) - 1;
                if (wordEnd > columns * rows || wordEnd > rowEnd) {
                    return false;
                }
                return true;
            case 'S':
                currentRow = populateGridUtils.currentRow(position, columns);
                if ((currentRow + (wordLen - 1)) > rows) {
                    return false
                }
                return true;
            case 'SW':
                wordEnd = position + (columns - 1) * (wordLen - 1);
                if ((position + 1) % columns > 0 || wordEnd >= columns * rows) {
                    return false;
                }
                return true;
            case 'W':
                const rowStart = position - (position % columns);
                wordEnd = position - (wordLen - 1);
                if (wordEnd < rowStart) {
                    return false
                }
                return true;
            case 'NW':
                wordEnd = position - (columns + 1) * (wordLen - 1);
                currentRow = populateGridUtils.currentRow(position, columns);
                let westBoundary = ((currentRow - (wordLen - 1)) * columns) - columns;
                if (wordEnd < 0 || wordEnd < westBoundary) {
                    return false;
                }
                return true;
        }
    }
}


export default PopulateGrid;
