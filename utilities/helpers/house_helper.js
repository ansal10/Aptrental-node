const wrap = require('decorator-wrap').wrap;
const validator = require('validator');
const models = require('../../db/models/index');
const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const permission = require('../permisson_utility');
const pageLimit = 50;
const _ = require('underscore');
const util = require('util');
const Op = models.Sequelize.Op;
Array.prototype.isArray = true;

const listAllHouse = async (user, searchParams) => {
    let params = {};
    let pageNumber = Number(searchParams.page || 0);

    await Object.keys(models.House.attributes).forEach(async (attr) => {
        if (searchParams[attr])
            params[attr] = searchParams[attr];
    });

    if (!params.availability) params.availability = 'yes';


    let houses = await models.House.findAll({
        limit: pageLimit,
        offset: pageLimit * pageNumber,
        attributes: ['title', 'country', 'city', 'locality', 'rent', 'builtArea', 'latitude',
            'longitude', 'type', 'availability', 'images', 'UserId', 'availableFrom', 'tags',
            'updatedAt'],
        where: params
    });

    houses = _.map(houses, (h) => {
        return h.dataValues;
    });

    for (let i = 0; i < houses.length; i++) {
        houses[i].edit = permission.canUpdateProperty(user, houses[i])
    }
    return houses;
};

const houseDetails = async (user, houseId) => {
    let house = await models.House.findOne({where: {id: houseId}});
    if (house) {
        house = house.dataValues;
        house.edit = permission.canUpdateProperty(user, house);
        return {
            status: true,
            message: '',
            args: {house: house}
        }
    } else {
        return {
            status: false,
            message: util.format('Could not find any property with ID: %s', houseId),
            args: {}
        }
    }
};

const updateHouse = async (user, houseParams) => {
    let house = await models.House.findOne({where: {id: houseParams.id}});
    if (house && permission.canUpdateProperty(user, house)) {

        try {
            Object.assign({}, house, houseParams);
            await house.validate();
            await house.save();
            return {
                status: true,
                message: 'House have been updated successfully',
                args: {
                    house: house
                }
            }
        } catch (e) {
            return {
                status: false,
                message: e.errors[0].message,
                args: {}
            }
        }

    } else {
        return {
            status: false,
            message: 'You cannot perform this action',
            args: {}
        }
    }
};

const createHouseInDatabase = async (user, houseParams) => {
    if (permission.canCreateProperty(user)) {
        houseParams = Object.assign({}, houseParams, {UserId: user.id});
        try {
            let house = await models.House.create(houseParams);
            return {
                status: true,
                args: {
                    house: house
                }
            }
        } catch (e) {
            return {
                status: false,
                message: e.errors[0].message,
                args: {}
            }
        }
    } else {
        return {
            status: false,
            message: 'You are not authorized',
            args: {}
        }
    }
};

const searchHouse = async (user, searchParams) => {
    // searchable params

    let isValidArray = function (v) {
        return !!(v && v.length > 0);
    };

    try {

        let query = {};
        if (searchParams.searchString && searchParams.searchString.trim().length > 0) {
            let s = '%' + searchParams.searchString.trim() + '%';
            query = Object.assign({}, query, {
                title: {[Op.iLike]: s},
                city: {[Op.iLike]: s},
                description: {[Op.iLike]: s},
                locality: {[Op.iLike]: s},
                address: {[Op.iLike]: s},
                country: {[Op.iLike]: s},
            })
        }

        if (isValidArray(searchParams.rent)) {  // [1,1000]
            query = Object.assign({}, query, {
                rent: {
                    [Op.between]: searchParams.rent
                }
            });
        }
        if (isValidArray(searchParams.builtArea)) {
            query = Object.assign({}, query, {
                builtArea: {
                    [Op.between]: searchParams.builtArea
                }
            });
        }
        if (isValidArray(searchParams.carpetArea)) {
            query = Object.assign({}, query, {
                carpetArea: {
                    [Op.between]: searchParams.carpetArea
                }
            });
        }
        if (isValidArray(searchParams.city)) {
            query = Object.assign({}, query, {
                city: {
                    [Op.in]: searchParams.city
                }
            });
        }
        if (isValidArray(searchParams.locality)) {
            query = Object.assign({}, query, {
                locality: {
                    [Op.in]: searchParams.locality
                }
            });
        }
        if (isValidArray(searchParams.country)) {
            query = Object.assign({}, query, {
                country: {
                    [Op.in]: searchParams.country
                }
            });
        }
        if (isValidArray(searchParams.latitude)) {
            query = Object.assign({}, query, {
                latitude: {
                    [Op.between]: searchParams.latitude
                }
            });
        }
        if (isValidArray(searchParams.longitude)) {
            query = Object.assign({}, query, {
                longitude: {
                    [Op.between]: searchParams.longitude
                }
            });
        }
        if (isValidArray(searchParams.type)) {
            query = Object.assign({}, query, {
                type: {
                    [Op.in]: searchParams.type
                }
            });
        }
        if (isValidArray(searchParams.availability)) {
            query = Object.assign({}, query, {
                availability: {
                    [Op.in]: searchParams.availability
                }
            });
        }

        if (isValidArray(searchParams.availableFor)) {
            query = Object.assign({}, query, {
                availability: {
                    [Op.in]: searchParams.availability
                }
            });
        }
        if (isValidArray(searchParams.availableFrom)) {
            query = Object.assign({}, query, {
                availableFrom: {
                    [Op.gte]: searchParams.availableFrom
                }
            });
        }
        if (isValidArray(searchParams.floor)) {
            query = Object.assign({}, query, {
                floor: {
                    [Op.in]: searchParams.floor
                }
            });
        }
        if (isValidArray(searchParams.powerBackup)) {
            query = Object.assign({}, query, {
                powerBackup: {
                    [Op.in]: searchParams.powerBackup
                }
            });
        }
        if (isValidArray(searchParams.furnishingStatus)) {
            query = Object.assign({}, query, {
                furnishingStatus: {
                    [Op.in]: searchParams.furnishingStatus
                }
            });
        }

        return await listAllHouse(user, query);
    }catch (e) {
        return {
            status: false,
            message: 'Incompatible data passed',
            args:{}
        }
    }


};


module.exports.listAllHouse = listAllHouse;
module.exports.houseDetails = houseDetails;
module.exports.updateHouse = updateHouse;
module.exports.createHouseInDatabase = createHouseInDatabase;
module.exports.searchHouse = searchHouse;
