import Grid from "./grid";

describe('create blank array', () => {
    it('should return array of size rows * columns', () => {
        const newGrid = Grid.createBlankGrid(3, 3);
        expect(newGrid.grid.length).toEqual(9);
    })
})

describe('populate grid with words', () => {
    it('should return a populated array', function () {
        const words = ['FOX'];
        const newGrid = Grid.createBlankGrid(3,3).populateWords(words);
        expect(newGrid.grid).toHaveLength(9);
        expect(newGrid.grid).toEqual(expect.arrayContaining(['F', 'O', 'X']));
    });
});

describe('fill blank spaces with random letters', () => {
    it.skip('should array of same size', function () {
        const words = ['FOX'];
        const fillGrid = Grid.createBlankGrid(4,4).populateWords(words).fillBlanks();
        expect(fillGrid.grid).toHaveLength(16);
    });
})