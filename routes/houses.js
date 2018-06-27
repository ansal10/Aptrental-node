const express = require('express');
const userValidator = require('./../utilities/validators/user_validators');
const userHelper = require('./../utilities/helpers/user_helper');
const houseHelper = require('./../utilities/helpers/house_helper');
const wrap = require('decorator-wrap').wrap;
const genUtil = require('../utilities/genutils/index');
const middlewares = require('../utilities/controller_middlewares');
const permissions = require('../utilities/permisson_utility');
const pageLimit = 50;
const models = require('../db/models/index');

const router = express.Router();

router.get('/', middlewares.isAuthenticated, async (req, res, next)=>{
    let user = req.session.user;
    let houses = await houseHelper.listAllHouse(user, req.query);
    genUtil.sendJsonResponse(res, 200, '', houses);
});

router.get('/:id'), middlewares.isAuthenticated, async (req, res, next) => {
    let user = req.session.user;
    let retVal = houseHelper.houseDetails(user, req.params.id);
    genUtil.sendJsonResponse(res, retVal.status ? 200: 400, retVal.message, retVal.args.house);
};

router.put('/:id', middlewares.isAuthenticated, async (req, res, next) => {
    let user = req.session.user;
    let retVal = houseHelper.updateHouse(user, req.params);
    genUtil.sendJsonResponse(res, retVal.status ? 200: 400, retVal.message, null);
});

router.post('/', middlewares.isAuthenticated, async (req, res, next)=>{
    let user = req.session.user;
    let retVal = houseHelper.cre
});

module.exports = router;