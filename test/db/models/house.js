const expect = require('chai').expect;
const assert = require('chai').assert;
const truncate = require('../truncate');
const houseFactory = require('../factories/house');

describe('House model', () => {
    let house;

    beforeEach(async () => {
        await truncate();
        house = await houseFactory();
    });

    it('should do something', async () => {
        expect(12).to.equal(12)
    });

    it('should create house with string form of rent', async()=>{
        let h = await houseFactory({rent:'121211 '});
        assert(h.rent === 121211);

    })
});