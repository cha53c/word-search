import PopulateGrid from "./populateGrid";
import Grid from "./grid";

const allDirections = ['N', 'E', "S", 'W'];

describe('getDirection', function () {

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

describe('checkDirections', function () {
    it('should return true for direction N', function () {
        const directionOK = PopulateGrid.checkDirections('N', 3, 3, 8, 3);
        expect(directionOK).toBeTruthy();
    });
    it('should return false for direction N', function () {
        const directionOK = PopulateGrid.checkDirections('N', 3, 3, 5, 3);
        expect(directionOK).toBeFalsy();
    });
    it('should return true for direction E', function () {
        const directionOK = PopulateGrid.checkDirections('E', 3, 3, 6, 3);
        expect(directionOK).toBeTruthy();
    });
    it('should return false for direction E', function () {
        const directionOK = PopulateGrid.checkDirections('E', 3, 3, 2, 3);
        expect(directionOK).toBeFalsy();
    });
    it('should return true for direction W', function () {
        const directionOK = PopulateGrid.checkDirections('W', 3, 3, 5, 3);
        expect(directionOK).toBeTruthy();
    });
    it('should return false for direction W', function () {
        const directionOK = PopulateGrid.checkDirections('W', 3, 3, 4, 3);
        expect(directionOK).toBeFalsy();
    });
    it('should return true for direction S', function () {
        const directionOK = PopulateGrid.checkDirections('S', 3, 3, 2, 3);
        expect(directionOK).toBeTruthy();
    });
    it('should return false for direction S', function () {
        const directionOK = PopulateGrid.checkDirections('S', 3, 3, 0, 4);
        expect(directionOK).toBeFalsy();
    });
    it('should return true for direction NE is within grid boundary', function () {
        const directionOK = PopulateGrid.checkDirections('NE', 3, 3, 6, 3);
        expect(directionOK).toBeTruthy();
    });
    it('should return false for direction NE out of grid boundary', function () {
        const directionOK = PopulateGrid.checkDirections('NE', 3, 3, 4, 3);
        expect(directionOK).toBeFalsy();
    });
})

describe('getNextDirection', () => {
    const directions = ['N', 'E', "S", 'W'];
    it('should return direction W', function () {
        const grid = Grid.buildNewGrid(2, 4);
        const direction = PopulateGrid.findNextDirection(grid, 0, 'fox', directions);
        expect(direction).toEqual('E');
    });
    it('should return false', function () {
        const grid = Grid.buildNewGrid(2, 2);
        const direction = PopulateGrid.findNextDirection(grid, 0, 'fox', directions);
        expect(direction).toBeFalsy();
    });
    it('should return truthy', function () {
        const grid = Grid.buildNewGrid(7, 7);
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
            grid = Grid.buildNewGrid(3, 3);
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
            const startSate = ['f', 'o', 'x', '-', '-', '-', '-', '-', '-'];
            grid.locationIndexes = [0, 1, 2];
            grid.letters = ['f', 'o', 'x', '-', '-', '-', '-', '-', '-'];
            let inserted = PopulateGrid.insertWord(grid, 2, 'S', 'poo');
            expect(inserted).toBeFalsy();
            expect(grid.letters).toEqual(startSate);
        });
        it('should return true if collision but letters match', function () {
            const startSate = ['f', 'o', 'x', '-', '-', '-', '-', '-', '-'];
            const endState = ['f', 'o', 'x', 'i', '-', '-', 'n', '-', '-'];
            grid.locationIndexes = [0, 1, 2];
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
    it('should return false when there are no letter in location', function () {
        grid.locationIndexes = [0, 1, 2];
        const collision = PopulateGrid.collisionDetections(grid, 'i', 3);
        expect(collision).toBeFalsy();
    });
    it('should return false when there is a letter in location but it is the same letter', function () {
        grid.locationIndexes = [0, 1, 2];
        grid.letters[1] = 'i';
        const collision = PopulateGrid.collisionDetections(grid, 'i', 1);
        expect(collision).toBeFalsy();
    });
    it('should return true when there is a letter in location which does not match the new letter', function () {
        grid.locationIndexes = [0, 1, 2];
        grid.letters[1] = 'b';
        const collision = PopulateGrid.collisionDetections(grid, 'i', 1);
        expect(collision).toBeTruthy();
    });
})