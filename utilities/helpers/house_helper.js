const wrap = require('decorator-wrap').wrap;
const validator = require('validator');
const models = require('../../db/models/index');
const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const permission = require('../permisson_utility');
const pageLimit = 50;
const _ = require('underscore');

const listAllHouse = async (user, searchParams) => {
    let params = {};
    let pageNumber = Number(searchParams.page || 0);

    await Object.keys(models.House.attributes).forEach(async (attr) => {
        if (searchParams[attr])
            params[attr] = searchParams[attr];
    });

    if(!params.availability) params.availability = 'yes';


    let houses = await models.House.findAll({
        limit: pageLimit,
        offset: pageLimit * pageNumber,
        attributes: ['title', 'country', 'city', 'locality', 'rent', 'builtArea', 'latitude', 'longitude', 'type', 'availability', 'images', 'UserId'],
        where: params
    });

    houses = _.map(houses, (h) => { return h.dataValues; });

    for (let i = 0; i < houses.length; i++) {
        houses[i].edit = permission.canUpdateProperty(user, houses[i])
    }
    return houses;
};

const houseDetails = async (user, houseId) => {
    let house = await models.House.findOne({where: {id: houseId}});
    if(house) {
        house.edit = permission.canUpdateProperty(user, house);
        return {
            status:true,
            message:'',
            args:{house:house}
        }
    }else{
        return{
            status: false,
            message: 'Could not find any property with this id'
        }
    }
};

const updateHouse = async (user, houseParams) => {
    let house = await models.House.findOne({where: {id: houseParams.id}});
    if(house && permission.canUpdateProperty(user, house)) {

        try {
            Object.assign({}, house, houseParams);
            await house.validate();
            await house.save();
            return {
                status: true,
                message: 'House have been updated successfully',
                args:{
                    house:house
                }
            }
        }catch (e) {
            return {
                status: false,
                message: e.errors[0].message,
                args:{}
            }
        }

    }else{
        return{
            status: false,
            message: 'You cannot perform this action',
            args:{}
        }
    }
};

const createHouseInDatabase = async (user, houseParams) => {
    if(permission.canCreateProperty(user)){
        houseParams = Object.assign({}, houseParams, {UserId:user.id});
        try {
            let house = await models.House.create(houseParams);
            return {
                status: true,
                args: {
                    house: house
                }
            }
        }catch (e) {
            return {
                status: false,
                message: e.errors[0].message,
                args:{}
            }
        }
    }else{
        return {
            status: false,
            message: 'You are not authorized',
            args: {}
        }
    }
};


module.exports.listAllHouse = listAllHouse;
module.exports.houseDetails = houseDetails;
module.exports.updateHouse = updateHouse;
module.exports.createHouseInDatabase = createHouseInDatabase;
