import PopulateGrid from "./populateGrid";


describe('getDirection', function () {
    const allDirections = ['N', 'E', "S", 'W'];
    it('should return all directions if no parameter is passed', function () {
        const availableDirections = PopulateGrid.getAvailableDirections();
        expect(availableDirections).toEqual(allDirections);
    });
    it('should return all directions if empty array is passed', function () {
        const availableDirections = PopulateGrid.getAvailableDirections([]);
        expect(availableDirections).toEqual(allDirections);
    });
    it('should return directions without N', function () {
        const availableDirections = PopulateGrid.getAvailableDirections(['N']);
        expect(availableDirections).toHaveLength(3);
        expect(availableDirections).toEqual(['E', "S", 'W']);
    });
    it('should return empty array', function () {
        const availableDirections = PopulateGrid.getAvailableDirections(allDirections);
        expect(availableDirections).toHaveLength(0);
        expect(availableDirections).toEqual([]);
    });
    it('should return directions without W', function () {
        const availableDirections = PopulateGrid.getAvailableDirections(['W']);
        expect(availableDirections).toHaveLength(3);
        expect(availableDirections).toEqual(['N', 'E', "S"]);
    });
})

describe('getRandomDirection', function () {
    it('should return element of 1 element array', function () {
        const direction = PopulateGrid.getRandomDirection(['W']);
        expect(direction).toEqual('W');
    });
    it('should return element from array', function () {
        const direction = PopulateGrid.getRandomDirection(['N', 'E', "S", 'W']);
        expect(direction).toEqual(expect.stringMatching('[NESW]'));
    });
})

describe.only('checkDirections', function () {
    it('should return true for direction N', function () {
        const directionOK = PopulateGrid.checkDirections('N', 3, 3, 8, 'fox');
        expect(directionOK).toBeTruthy();
    });
    it('should return false for direction N', function () {
        const directionOK = PopulateGrid.checkDirections('N', 3, 3, 5, 'fox');
        expect(directionOK).toBeFalsy();
    });
    it('should return true for direction E', function () {
        const directionOK = PopulateGrid.checkDirections('E', 3, 3, 6, 'fox');
        expect(directionOK).toBeTruthy();
    });
    it('should return false for direction E', function () {
        const directionOK = PopulateGrid.checkDirections('E', 3, 3, 2, 'fox');
        expect(directionOK).toBeFalsy();
    });
    it('should return true for direction W', function () {
        const directionOK = PopulateGrid.checkDirections('W', 3, 3, 5, 'fox');
        expect(directionOK).toBeTruthy();
    });
    it('should return false for direction W', function () {
        const directionOK = PopulateGrid.checkDirections('W', 3, 3, 4, 'fox');
        expect(directionOK).toBeFalsy();
    });
    it('should return true for direction S', function () {
        const directionOK = PopulateGrid.checkDirections('S', 3, 3, 2, 'fox');
        expect(directionOK).toBeTruthy();
    });
    it('should return false for direction S', function () {
        const directionOK = PopulateGrid.checkDirections('S', 3, 3, 4, 'fox');
        expect(directionOK).toBeFalsy();
    });
})
