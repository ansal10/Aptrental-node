const express = require('express');
const userValidator = require('../../../utilities/validators/user_validators');
const userHelper = require('../../../utilities/helpers/user_helper');
const houseHelper = require('../../../utilities/helpers/house_helper');
const genUtil = require('../../../utilities/genutils/index');
const middlewares = require('../../../utilities/controller_middlewares');
const permissions = require('../../../utilities/permisson_utility');
const pageLimit = 50;
const router = express.Router();

router.post('/search', middlewares.isAuthenticated, async (req, res, next)=>{
    let user = req.session.user;
    let page = req.query.page || 0;
    let houses = await houseHelper.searchHouse(user, req.body || {}, req.query.page || 0);
    genUtil.sendJsonResponse(res, 200, '', houses);
});

router.get('/:id', middlewares.isAuthenticated, async (req, res, next) => {
    let user = req.session.user;
    let retVal = await houseHelper.houseDetails(user, req.params.id);
    genUtil.sendJsonResponse(res, retVal.status ? 200: 400, retVal.message, retVal.args.house);
});

router.put('/:id', middlewares.isAuthenticated, async (req, res, next) => {
    let user = req.session.user;
    let retVal = await houseHelper.updateHouse(user, req.params);
    genUtil.sendJsonResponse(res, retVal.status ? 200: 400, retVal.message, null);
});

router.post('/', middlewares.isAuthenticated, async (req, res, next)=>{
    let user = req.session.user;
    let retVal = await houseHelper.createHouseInDatabase(user, req.body);
    genUtil.sendJsonResponse(res, retVal.status ? 201: 400, retVal.message, retVal.args.user)
});

module.exports = router;