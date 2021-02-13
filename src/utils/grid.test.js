import grid from "./grid";

describe('reduce locations array', () => {
    it.skip('should not contain duplicates', function () {
        const wordLocations = [[0, 1, 2], [2, 5, 8]];
        const locations = grid.reduceLocations(wordLocations);
        expect(locations).toEqual([0, 1, 2, 5, 8])
    });
})

describe('populateGrid', () => {
    it.only('should return a populated array', function () {
        const grid = grid.populateGrid();
        expect(grid.length).toEqual(9);
    });
})