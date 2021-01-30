import utils from './utils'

describe('test letter  selection', () => {
    it('add letter to empty selection', () => {
        const selected = [];
        const updated = utils.toggleLetterSelection(4, selected);
        expect(updated).toEqual([4]);
    });
});
