import utils from './utils'

describe('test letter  selection', () => {
    it('should return new array', () => {
        const selected = [1, 2];
        const updated = utils.toggleLetterSelection(4, selected);
        expect(selected).not.toBe(updated);
    });
    it('add letter to empty selection', () => {
        const selected = [];
        const updated = utils.toggleLetterSelection(4, selected);
        expect(updated).toEqual([4]);
    });
    it('should return empty array', () => {
        const selected = [4];
        const updated = utils.toggleLetterSelection(4, selected);
        expect(updated).toEqual([]);
    })
    it('remove element', () => {
        const selected = [4, 7, 8];
        const updated = utils.toggleLetterSelection(4, selected);
        expect(updated.length).toEqual(2);
        expect(updated).toEqual([7, 8]);
    })
});

describe('test random letter', () => {
    it('should return a letter', () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        const letter = utils.randomLetter();
        expect(alphabet).toContain(letter);
    });
})

describe('flatten', () => {
    it('should flatten location arrays to single array', function () {
        const array = [{location: [1]}, {location: [2]}, {location: [3]}]
        const flattened = utils.flatten(array);
        expect(flattened).toEqual([1, 2, 3])
    });
})

