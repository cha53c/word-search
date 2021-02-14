import PopulateGrid from "./populateGrid";


describe.only('getDirection', function () {
    const allDirections = ['N', 'E', "S", 'W'];
    it('should return all directions if no parameter is passed', function () {
        const availableDirections = PopulateGrid.getDirection();
        expect(availableDirections).toEqual(allDirections);
    });
    it('should return all directions if empty array is passed', function () {
        const availableDirections = PopulateGrid.getDirection([]);
        expect(availableDirections).toEqual(allDirections);
    });
    it('should return directions without N', function () {
        const availableDirections = PopulateGrid.getDirection(['N']);
        expect(availableDirections).toHaveLength(3);
        expect(availableDirections).toEqual(['E', "S", 'W']);
    });
    it('should return empty array', function () {
        const availableDirections = PopulateGrid.getDirection(allDirections);
        expect(availableDirections).toHaveLength(0);
        expect(availableDirections).toEqual([]);
    });
    it('should return directions without W', function () {
        const availableDirections = PopulateGrid.getDirection(['W']);
        expect(availableDirections).toHaveLength(3);
        expect(availableDirections).toEqual(['N', 'E', "S"]);
    });
})
