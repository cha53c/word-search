import Grid from "./grid";


describe('grid', () => {
    describe('buildNewGrid', () => {
        it('should return a populated grid', () => {
            const newGrid = Grid.buildNewGrid(3, 3);
            expect(newGrid.letters.length).toEqual(9);
            expect(newGrid.size).toEqual(9);
            expect(newGrid.gameComplete).toBeFalsy();
        })
    })
});
