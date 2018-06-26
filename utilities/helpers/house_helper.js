const wrap = require('decorator-wrap').wrap;
const validator = require('validator');
const models = require('../../db/models/index');
const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const permission = require('../permisson_utility');
const pageLimit = 50;


const listAllHouse = async (user, searchParams) => {
    let params = {};
    let pageNumber = searchParams.page || 0;

    await Object.keys(models.House.attributes).forEach(async (attr) => {
        if (searchParams[attr])
            params[attr] = searchParams[attr];
    });


    let houses = await models.House({
        limit: pageLimit,
        offset: pageLimit * pageNumber,
        attributes: ['name', 'sex', 'email', 'role', 'status'],
        where: params
    });

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
    }
};

const updateHouse = async (user, houseParams) => {
    let house = await models.House.findOne({where: {id: houseParams.id}});
    if(permission.canUpdateProperty(user, house)) {
        await models.House.update(houseParams, {where: {id: houseParams.id}});
        return {
            status: true,
            message: 'House have been updated successfully',
        }
    }else{
        return{
            status: false,
            message: 'You cannot perform this action'
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
                message: e.errors[0].message
            }
        }
    }else{
        return{
            status: false,
            message: 'You are not authorized'
        }
    }
};


module.exports.listAllHouse = listAllHouse;
module.exports.houseDetails = houseDetails;
module.exports.updateHouse = updateHouse;
module.exports.createHouseInDatabase = createHouseInDatabase;
