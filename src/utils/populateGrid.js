const PopulateGrid = {
    getRandomLocation(gridSize) {
        return Math.floor(Math.random() * gridSize);
        // return availableLocations[`Math.floor(Math.random() * availableLocations.length)];
    },
    getAvailableDirections(failedDirections = []) {
        // directions can be N E S W
        // N writes from bottom to top. E writes left to right, S top to bottom, W right to left
        // TODO add diagonals NE, SE, SW, NW
        const directions = ['N', 'E', "S", 'W'];
        const availableDirections = directions.filter(d => !failedDirections.includes(d));
        return availableDirections;
    },
    getRandomDirection(directions) {
        if (directions.length === 1) {
            return directions[0];
        }
        return directions[Math.floor(Math.random() * directions.length)];
    },
    // TODO write more tests for this
    findNextDirection(grid, position, word, directions) {
        const failedDirections = [];
        let remainingDirections = directions;
        // TODO change to forEach
        for (let i = 0; i <= directions.length; i++) {
            const candidateDirection = this.getRandomDirection(remainingDirections);
            const directionOK = this.checkDirections(candidateDirection, grid.rows, grid.columns, position, word.length);
            if (directionOK) {
                return candidateDirection;
            }
            failedDirections.push(candidateDirection);
            remainingDirections = this.getAvailableDirections(failedDirections);
        }
        return false;
    },
    insertWord(grid, position, direction, word) {
        console.log('insertWord', word);
        const letters = [...word];
        let letterLocations = [];
        let currentPosition = position;
        let collision = false;
        for(let i = 0; i < letters.length; i++){
            if (this.collisionDetections(grid, letters[i], currentPosition)) {
                collision = true;
                letterLocations = [];
            }
            if (collision) {
                break;
            }
            letterLocations.push(currentPosition);
            // grid.letters[currentPosition] = letters[i];
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
            for(let i = 0; i < letters.length; i++) {
                grid.letters[letterLocations[i]] = letters[i];
            }
            console.log('adding to wordLocations', letterLocations );
            grid.wordLocations.push(letterLocations);
            console.log('this.words', this.words);
            grid.words.find(e => e.word === word).location = letterLocations;
            console.log('words after location added ', grid.words);
            return true
        }
    },
    collisionDetections(grid, letter, location) {
        if (grid.locationIndexes.includes(location)) {
            //if the letters are the same then it's not a collision
            return letter !== grid.letters[location];
        }
    },
    calculateNextPosition(grid, direction, currentPosition) {
        switch (direction) {
            case 'N':
                return currentPosition - grid.columns;
            case 'E':
                return currentPosition + 1;
            case 'S':
                return currentPosition + grid.columns;
            case 'W':
                return currentPosition - 1;

        }
    },
    checkDirections(direction, rows, columns, position, wordLen) {
        switch (direction) {
            case 'N':
                if (position - ((wordLen - 1) * columns) >= 0) {
                    return true;
                }
                return false;
            case 'E':
                const rowEnd = position - (position % columns) + (columns - 1);
                if (position + (wordLen - 1) > rowEnd) {
                    return false;
                }
                return true;
            case 'S':
                // TODO which way of doing this is better
                if (position + ((wordLen - 1) * columns) > (rows * columns) - 1) {
                    return false;
                }
                // const wordEnd = position + ((wordLen - 1) * columns);
                // const columnEnd = position + ((rows - (Math.floor(position / rows) + 1)) * columns);
                // if (wordEnd > columnEnd) {
                //     return false
                // }
                return true;
            case 'W':
                const rowStart = position - (position % columns);
                if (position - (wordLen - 1) < rowStart) {
                    return false
                }
                return true;
        }
    }
}


export default PopulateGrid;
