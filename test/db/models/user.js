const expect = require('chai').expect;
const truncate = require('../truncate');
const models = require('../../../db/models/index');
const userFactory = require('../factories/user');
const houseFactory = require('../factories/house');

describe('User model', () => {
    let user, house;
    beforeEach(async () => {
        await truncate();
    });

    it('should allow realtor to assign house', async () => {
        user = await userFactory();
        console.log("user id is " + user.id);
        let h2 = await houseFactory();
        h2.UserId= user.id;
        await h2.save();
        let houses = await models.House.findAll({include:[{model:models.User}]});
        console.log(houses)
    });
});