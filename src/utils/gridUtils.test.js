import gridUtils from "./gridUtils";

describe('reduce locations array', () =>  {
    it.skip('should not contain duplicates', function () {
        const wordLocations = [[0, 1, 2], [2, 5, 8]];
        const locations = gridUtils.reduceLocations(wordLocations);
        expect(locations).toEqual([0,1,2,5,8])
    });
})

describe('populateGrid', () => {
    it.only('should return a populated array', function () {
        const grid = gridUtils.populateGrid();
        expect(grid.length).toEqual(9);
    });
})