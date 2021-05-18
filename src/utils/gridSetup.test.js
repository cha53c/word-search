import gridSetup from "./gridSetup";

describe('createBlankGrid', () => {
    it('should return new grid', function () {
        const rows = 3, columns = 4;
        const grid = gridSetup.greatBlankGrid(rows, columns);
        expect(grid.rows).toEqual(rows);
        expect(grid.columns).toEqual(columns);
        expect(grid.size).toEqual(rows * columns);
        expect(grid.letters.length).toEqual(rows * columns);
        expect(grid.gameComplete).toBeFalsy();
    });
})