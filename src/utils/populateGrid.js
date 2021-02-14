
const PopulateGrid = {
    getRandomLocation(gridSize) {
        Math.floor(Math.random() * gridSize)
    },
    getDirection(failedDirections = []) {
        // directions can be N E S W
        // N writes from bottom to top. E writes left to right, S top to bottom, W right to left
        // TODO add diagonals NE, SE, SW, NW
        const directions = ['N', 'E', "S", 'W'];
        const availableDirections = directions.filter( d => !failedDirections.includes(d));
        return availableDirections;
    }

}


export default PopulateGrid;
