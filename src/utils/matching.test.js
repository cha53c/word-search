import matching from './matching';
// const {expect}  = require('chai');


describe('match not found', () => {
    it('should return true if match found', () => {
        const matched = matching.isMatch([1, 2, 3], [1, 2, 3]);
        expect(matched).toBeTruthy();
    });
});
