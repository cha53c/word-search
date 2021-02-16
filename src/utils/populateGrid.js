const PopulateGrid = {
    getRandomLocation(gridSize) {
        Math.floor(Math.random() * gridSize)
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
    // TODO write tests for this
    findNextDirection(grid, position, word, directions) {
        const failedDirections = [];
        let remainingDirections = directions;
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
    checkDirections(direction, rows, columns, position, wordLen) {
        // const wordLen = word.length;
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
