import PopulateGrid from "./populateGrid";
import Grid from "./grid";
import gridSetup from "./gridSetup";

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

describe('checkDirections', function () {
    describe('check N', () => {
        it('should be within N boundary', function () {
            const directionOK = PopulateGrid.checkDirections('N', 3, 3, 8, 3);
            expect(directionOK).toBeTruthy();
        });
        it('should be within N boundary, top left', function () {
            const directionOK = PopulateGrid.checkDirections('N', 3, 3, 6, 3);
            expect(directionOK).toBeTruthy();
        });
        it('should return false, N boundary overrun', function () {
            const directionOK = PopulateGrid.checkDirections('N', 3, 3, 8, 4);
            expect(directionOK).toBeFalsy();
        });

    });
    describe('check E', () => {
        it('should return true for direction E', function () {
            const directionOK = PopulateGrid.checkDirections('E', 3, 3, 6, 3);
            expect(directionOK).toBeTruthy();
        });
        it('should be false, overruns end of grid boundary', function () {
            const directionOK = PopulateGrid.checkDirections('E', 3, 3, 7, 3);
            expect(directionOK).toBeFalsy();
        });
        it('should return false for direction E', function () {
            const directionOK = PopulateGrid.checkDirections('E', 3, 3, 5, 3);
            expect(directionOK).toBeFalsy();
        });
    });

    describe('check W', () => {
        it('should return true for direction W', function () {
            const directionOK = PopulateGrid.checkDirections('W', 3, 3, 5, 3);
            expect(directionOK).toBeTruthy();
        });
        it('should be true, within lower boundary of grid', function () {
            const directionOK = PopulateGrid.checkDirections('W', 3, 3, 2, 3);
            expect(directionOK).toBeTruthy();
        });
        it('should be false, overruns lower boundary of grid', function () {
            const directionOK = PopulateGrid.checkDirections('W', 3, 3, 2, 4);
            expect(directionOK).toBeFalsy();
        });
        it('should return false for direction W', function () {
            const directionOK = PopulateGrid.checkDirections('W', 3, 3, 4, 3);
            expect(directionOK).toBeFalsy();
        });
    });

    describe('check S', () => {
        it('should return true for direction S', function () {
            const directionOK = PopulateGrid.checkDirections('S', 3, 3, 2, 3);
            expect(directionOK).toBeTruthy();
        });
        it('should be false, overruns grid boundary', function () {
            const directionOK = PopulateGrid.checkDirections('S', 3, 3, 2, 4);
            expect(directionOK).toBeFalsy();
        });
        it('should return false for direction S', function () {
            const directionOK = PopulateGrid.checkDirections('S', 3, 3, 0, 4);
            expect(directionOK).toBeFalsy();
        });
        it('should be false when south boundary is overrun direction S', function () {
            const directionOK = PopulateGrid.checkDirections('S', 3, 3, 7, 3);
            expect(directionOK).toBeFalsy();
        });
    });

    describe('check NE', () => {
        it('should return true for direction NE is within grid boundary', function () {
            const directionOK = PopulateGrid.checkDirections('NE', 3, 3, 6, 3);
            expect(directionOK).toBeTruthy();
        });
        it('should return false for direction NE out of grid boundary', function () {
            const directionOK = PopulateGrid.checkDirections('NE', 3, 3, 3, 3);
            expect(directionOK).toBeFalsy();
        });
        it('should be false, overruns east boundary', function () {
            const directionOK = PopulateGrid.checkDirections('NE', 3, 3, 7, 3);
            expect(directionOK).toBeFalsy();
        });
    });

    describe('check SW', () => {
        it('should be true if word is inside west boundary', function () {
            const directionOK = PopulateGrid.checkDirections('SW', 3, 3, 2, 3);
            expect(directionOK).toBeTruthy();
        });
        it('should be false if word overruns west boundary', function () {
            const directionOK = PopulateGrid.checkDirections('SW', 3, 3, 1, 3);
            expect(directionOK).toBeFalsy();
        });
        it('should be false if word overruns south boundary', function () {
            const directionOK = PopulateGrid.checkDirections('SW', 3, 3, 5, 3);
            expect(directionOK).toBeFalsy();
        });
        describe('check SE', () => {
            it('should be true if word is inside east boundary', function () {
                const directionOK = PopulateGrid.checkDirections('SE', 3, 3, 0, 3);
                expect(directionOK).toBeTruthy();
            });
            it('should be false, word overrun east boundary', function () {
                const directionOK = PopulateGrid.checkDirections('SE', 3, 3, 1, 3);
                expect(directionOK).toBeFalsy();
            });
            it('should be false, word overrun east boundary middle', function () {
                const directionOK = PopulateGrid.checkDirections('SE', 3, 3, 2, 2);
                expect(directionOK).toBeFalsy();
            });
            it('should be false, word overrun south boundary', function () {
                const directionOK = PopulateGrid.checkDirections('SE', 3, 3, 3, 3);
                expect(directionOK).toBeFalsy();
            });
        })
        describe('check NW', () => {
            it('should be true when within grid boundary', function () {
                const directionOK = PopulateGrid.checkDirections('NW', 3, 3, 8, 3);
                expect(directionOK).toBeTruthy();
            });
            it('should be false when overruns west boundary', function () {
                const directionOK = PopulateGrid.checkDirections('NW', 3, 3, 7, 3);
                expect(directionOK).toBeFalsy();
            });
            it('should be false when overruns west boundary, middle', function () {
                const directionOK = PopulateGrid.checkDirections('NW', 3, 3, 6, 2);
                expect(directionOK).toBeFalsy();
            });
            it('should be false when overruns north boundary', function () {
                const directionOK = PopulateGrid.checkDirections('NW', 3, 3, 5, 3);
                expect(directionOK).toBeFalsy();
            });
        })
        // TODO NW
    })

})

describe('findNextDirection', () => {
    const directions = ['N', 'E', "S", 'W'];
    it('should return direction W', function () {
        // const grid = Grid.buildNewGrid(2, 4);
        const grid = gridSetup.createBlankGrid(2, 4);
        const direction = PopulateGrid.findNextDirection(grid, 0, 'fox', directions);
        expect(direction).toEqual('E');
    });
    it('should return false', function () {
        const grid = gridSetup.createBlankGrid(2, 2);
        const direction = PopulateGrid.findNextDirection(grid, 0, 'fox', directions);
        expect(direction).toBeFalsy();
    });
    it('should return truthy', function () {
        const grid = gridSetup.createBlankGrid(7, 7);
        const direction = PopulateGrid.findNextDirection(grid, 17, 'fox', directions);
        expect(direction).toBeTruthy();
    });

    describe('calculateNextPosition', () => {
        let grid;
        beforeEach(() => {
            grid = Grid.buildNewGrid(3, 3);
        });
        it('should subtract column count from current position for direction N', function () {
            const position = PopulateGrid.calculateNextPosition(grid, 'N', 4);
            expect(position).toEqual(1);
        });
        it('should add column count to current position for direction S', function () {
            const position = PopulateGrid.calculateNextPosition(grid, 'S', 5);
            expect(position).toEqual(8);
        });
        it('should add 1 to current position for direction E', function () {
            const position = PopulateGrid.calculateNextPosition(grid, 'E', 0);
            expect(position).toEqual(1);
        });
        it('should subtract 1 from current position for direction W', function () {
            const position = PopulateGrid.calculateNextPosition(grid, 'W', 2);
            expect(position).toEqual(1);
        });
        it('should find next position NE', function () {
            const position = PopulateGrid.calculateNextPosition(grid, 'NE', 6);
            expect(position).toEqual(4);
        });
        it('should find next position NW', function () {
            const position = PopulateGrid.calculateNextPosition(grid, 'NW', 8);
            expect(position).toEqual(4);
        });

    })

    describe('insertWord', () => {
        let grid;
        beforeEach(() => {
            // grid = Grid.buildNewGrid(3, 3);
            grid = gridSetup.createBlankGrid(3, 3);
            grid = gridSetup.fillBlanks(grid);
            grid.words = [{word: 'fox', location: [], found: false}];
        });

        it('should insert word at start of array', function () {
            let inserted = PopulateGrid.insertWord(grid, 0, 'E', 'fox');
            expect(inserted).toBeTruthy();
            expect(grid.letters).toHaveLength(9);
            expect(grid.letters[0]).toEqual('f');
            expect(grid.letters[1]).toEqual('o');
            expect(grid.letters[2]).toEqual('x');
        });
        it('should return false if there are collisions', function () {
            const startState = ['f', 'o', 'x', '-', '-', '-', '-', '-', '-'];
            grid.letters = ['f', 'o', 'x', '-', '-', '-', '-', '-', '-'];
            grid.words = [{word: 'fox', location: [0, 1, 2], found: false}, {word: 'poo', location: [], found: false}];
            let inserted = PopulateGrid.insertWord(grid, 2, 'S', 'poo');
            expect(inserted).toBeFalsy();
            expect(grid.letters).toEqual(startState);
        });
        it('should return true if collision but letters match', function () {
            grid.words = [{word: 'fox', location: [0, 1, 2], found: false}, {word: 'fin', location: [], found: false}];
            const endState = ['f', 'o', 'x', 'i', '-', '-', 'n', '-', '-'];
            grid.letters = ['f', 'o', 'x', '-', '-', '-', '-', '-', '-'];
            let inserted = PopulateGrid.insertWord(grid, 0, 'S', 'fin');
            expect(inserted).toBeTruthy();
            expect(grid.letters).toEqual(endState);
        });
    })
})

describe('collisionDetection', () => {
    let grid;
    beforeEach(() => {
        grid = Grid.buildNewGrid(3, 3);
    });
    it('should return false when there are no letters in location', function () {
        grid.words = [{word: 'poo', location: [0, 1, 2], found: false}];
        const collision = PopulateGrid.collisionDetections(grid, 'i', 3);
        expect(collision).toBeFalsy();
    });
    it('should return false when there is a letter in location but it is the same letter', function () {
        grid.words = [{word: 'poo', location: [0, 1, 2], found: false}];
        grid.letters[1] = 'i';
        const collision = PopulateGrid.collisionDetections(grid, 'i', 1);
        expect(collision).toBeFalsy();
    });
    it('should return true when there is a letter in location which does not match the new letter', function () {
        grid.words = [{word: 'poo', location: [0, 1, 2], found: false}];
        grid.letters[1] = 'b';
        const collision = PopulateGrid.collisionDetections(grid, 'i', 1);
        expect(collision).toBeTruthy();
    });
})