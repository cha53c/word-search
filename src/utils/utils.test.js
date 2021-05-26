import utils from './utils'

describe('utils', () => {
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
            const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
            const letter = utils.randomLetter();
            expect(alphabet.includes(letter)).toEqual(true);
        });

    })

    describe('flatten', () => {
        it('should flatten location arrays to single array', function () {
            const array = [{location: [1]}, {location: [2]}, {location: [3]}]
            const flattened = utils.flatten(array);
            expect(flattened).toEqual([1, 2, 3])
        });
    })

    describe('numberStatus', () => {
        const selected = [1, 2];
        const found = [2, 3];
        const SELECTED_NOT_FOUND = 1;
        const FOUND_AND_SELECTED = 2;
        const FOUND_NOT_SELECTED = 3;
        const NOT_FOUND_NOT_SELECTED = 4;
        it('should be candidate if not found but selected', function () {
            expect(utils.letterStatus(SELECTED_NOT_FOUND, selected, found)).toEqual('candidate');
        });
        it('should be candidate if found and selected', function () {
            expect(utils.letterStatus(FOUND_AND_SELECTED, selected, found)).toEqual('candidate');
        });
        it('should be matched if already found, but not selected', function () {
            expect(utils.letterStatus(FOUND_NOT_SELECTED, selected, found)).toEqual('matched');
        });
        it('should be available if not found and not selected', function () {
            expect(utils.letterStatus(NOT_FOUND_NOT_SELECTED, selected, found)).toEqual('available');
        });
    });
});
