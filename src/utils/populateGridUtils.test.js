import populateGridUtils from './populateGridUtils'

describe('poplulateGridUtils', () => {
    it('should setRandomLocations', function () {
        const randomLocation = populateGridUtils.getRandomLocations(6);
        expect(randomLocation.length).toEqual(6);
        expect(randomLocation).toEqual(expect.arrayContaining([0,1,2,3,4,5]));
    });
})