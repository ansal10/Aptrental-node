const expect = require('chai').expect;
const truncate = require('../truncate');
const houseFactory = require('../factories/house');

describe('House model', () => {
    let user;
    beforeEach(async () => {
        await truncate();
        user = await houseFactory();
    });

    it('should do something', async () => {
        expect(12).to.equal(12)
    });
});