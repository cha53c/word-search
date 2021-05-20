import gridSetup from "./gridSetup";

describe('gridSetup', () => {
    describe('createBlankGrid', () => {
        it('should return new grid', function () {
            const rows = 3, columns = 4;
            const grid = gridSetup.createBlankGrid(rows, columns);
            expect(grid.rows).toEqual(rows);
            expect(grid.columns).toEqual(columns);
            expect(grid.size).toEqual(rows * columns);
            expect(grid.letters.length).toEqual(rows * columns);
            expect(grid.gameComplete).toBeFalsy();
        });
    })
    describe('setWords', () => {
        it('should populate words element of grid with word objects', function () {
            const grid = {}
            const updatedGrid = gridSetup.setWords(grid, ['bish', 'bash', 'bosh']);
            expect(updatedGrid.words.length).toEqual(3)
            expect(updatedGrid.words[0]).toEqual({word: 'bish', location: [], found: false});
        });
    })

    describe('insertWordsintoGrid', () => {
        it('should insert words', function () {
            const words = ['to'];
            let grid = gridSetup.createBlankGrid(2, 2)
            grid = gridSetup.insertWordsIntoGrid(grid, words);
            expect(grid.letters).toEqual(expect.arrayContaining(['t', 'o']));
        });
    });

    describe('fillBlanks', () => {
        it('should fill blank array with random letters', function () {
            let grid = gridSetup.createBlankGrid(6, 6);
            grid = gridSetup.fillBlanks(grid);
            expect(grid.letters).toEqual(expect.not.arrayContaining(['-']));
        });
        it('should fill blanks ignoring populated locations', function () {
            let grid = gridSetup.createBlankGrid(3, 3);
            grid.letters[0] = 'A';
            grid.locationIndexes.push(0);
            grid = gridSetup.fillBlanks(grid);
            expect(grid.letters).toEqual(expect.arrayContaining(['A']));
        });
    });
});