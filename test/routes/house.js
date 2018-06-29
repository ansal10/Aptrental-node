process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = require('chai').assert;
const should = chai.should();
const truncate = require('../db/truncate');
const userHelper = require('../../utilities/helpers/user_helper');
const moment = require('moment');
const models = require('../../db/models/index');
const faker = require('faker');
const houseFactory = require('../db/factories/house');
const userFactory = require('../db/factories/user');
const md5 = require('md5');
const validator = require('validator');
const sinon = require('sinon');
const controllerMiddleware = require('../../utilities/controller_middlewares');
let server = null;
let request = null;



chai.use(chaiHttp);

describe('House', async () => {

    let defaultHouseParams = {
        title: faker.name.firstName() + faker.name.lastName(),
        description: "This is just a test desription that will check what is valid description here around",
        rent: faker.random.number(),
        maintenance:{
            monthly:10,
            brokerage: 100,
            deposit: 2500
        },
        builtArea: faker.random.number() + 250,
        carpetArea: faker.random.number() + 250,
        city: faker.address.city(),
        locality: faker.address.streetName(),
        country: faker.address.country().split(' ')[0],
        address: faker.address.streetName() + " " + faker.address.city,
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        type: '2bhk',
        availability: 'yes',
        availableFor: 'all',
        availableFrom: moment().toISOString(),
        floor: 2,
        powerBackup: 'full',
        amenities: [
            {amenity:'ac installed', quantity:Math.floor(Math.random()*10)},
            {amenity:'bedroom', quantity:Math.floor(Math.random()*10)},
            {amenity:'bathroom', quantity: Math.floor(Math.random()*10)},
        ],
        features: ['Cover car parking', 'Centrally air conditioned', '24 hours security'],
        tags: [faker.random.arrayElement(), faker.random.arrayElement(), faker.random.arrayElement()],
        images: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
        furnishingStatus: 'furnished',
    };
    let user = null;

    beforeEach(async () => {
        await truncate();
        user = await userFactory({
            emailAttributes: { verified: true},
            passwordAttributes: {salt: '1234', hash: md5('1234'+ '1234')},
            role: 'admin'
        });
        sinon.stub(controllerMiddleware, 'isAuthenticated').callsFake((req, res, next) => {
            req.session.user = user;
            return next();
        });
        server = require('../../app');
    });

    afterEach(async () =>{
        controllerMiddleware.isAuthenticated.restore();
    });

    describe('/search POST Search Houses', () => {

        it('it should return all available property user successful', async () => {
            await houseFactory();
            await houseFactory();
            let res = await chai.request(server).post('/api/v1/house/search');
            res.should.have.status(200);
            assert(res.body.success.data.length === 2);
        });
        it('it should return no property', async () => {
            let res = await chai.request(server).post('/api/v1/house/search');
            res.should.have.status(200);
            assert(res.body.success.data.length === 0);
        });
    });

    describe('/ POST House', () => {
        it('should create house with successfull parameters', async() => {
            let res = await chai.request(server).post('/api/v1/house').send(defaultHouseParams);
            res.should.have.status(201);
            if(res.body.error)
                console.log(res.body.error.message);

        });

        it('should report error for no images', async () => {
            let res = await chai.request(server).post('/api/v1/house').send(Object.assign({}, defaultHouseParams, {images:[]}));
            res.should.have.status(400);
            expect(res.body.error.message.includes('Images'));
        });

        it('should report error on invaid amenity', async () => {
            let params = Object.assign({}, defaultHouseParams, {amenities: [{amenity: 'Invalid', quantity: 2}]});
            let res = await chai.request(server).post('/api/v1/house').send(params);
            res.should.have.status(400);
            expect(res.body.error.message.includes('Amenity'));
        });

        it('should report error on invaid features', async () => {
            let params = Object.assign({}, defaultHouseParams, {features: ['  ']});
            let res = await chai.request(server).post('/api/v1/house').send(params);
            res.should.have.status(400);
            expect(res.body.error.message.includes('Amenity'));
        });

        it('should report invalid type of data', async () => {
            let res = await chai.request(server).post('/api/v1/house').send(Object.assign({}, defaultHouseParams, {images:{}}));
            res.should.have.status(400);
            expect(res.body.error.message.includes('Invalid value in Images'));
        });
    });



});