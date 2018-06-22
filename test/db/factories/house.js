const faker = require('faker');
const models = require('../../../db/models/index');

/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => {
    const defaultProps = {
        title: faker.name.title(),
        description: faker.name.jobDescriptor(),
        city: faker.address.city(),
        locality: faker.address.streetName(),
        country: faker.address.country(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        tags: [faker.random.arrayElement(), faker.random.arrayElement(), faker.random.arrayElement()],
        images: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
        type: '2bhk',
        floor: 2,
        areaSize: faker.random.number(),
        carpetSize: faker.random.number(),
        furnishingStatus: 'furnished',
        rate: faker.random.number()

    };
    return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */
module.exports = async (props = {}) =>
    models.House.create(await data(props));