const express = require('express');
const userValidator = require('./../utilities/validators/user_validators');
const userHelper = require('./../utilities/helpers/user_helper');
const wrap = require('decorator-wrap').wrap;
const genUtil = require('../utilities/genutils/index');
const middlewares = require('../utilities/controller_middlewares');
const permissions = require('../utilities/permisson_utility');
const pageLimit = 50;
const models = require('../db/models/index');
const notifier = require('../utilities/notifier/index');

const router = express.Router();


/***
 * @param email, password, sex,
 */

router.post('/signup', async (req, res, next) => {
    let email = req.body.email || '' ;
    let password = req.body.password || '' ;
    let name = req.body.name || '' ;
    let sex = req.body.sex || '' ;

    let retVal = await userValidator.validateAndSanitizeSignupDetails(email, name, password, sex);
    if(retVal.status === false)
        genUtil.sendJsonResponse(res, 400, retVal.message, null);
    else{
        retVal = await userHelper.createUserInDatabase(retVal.args);
        notifier.notifyPasswordReset(retVal.args.user);
        genUtil.sendJsonResponse(res, 201, retVal.message, null);
    }

});

// login
router.post('/login', async (req, res, next) => {
    let email = req.body.email || '';
    let password = req.body.password || '';

    let retVal = await userValidator.validateLoginDetails(email, password);
    if(retVal.status === false)
        genUtil.sendJsonResponse(res, 401, retVal.message, null);
    else{
        let session = req.session;
        session.user = retVal.args.user;
        session.userid = session.user.id;
        genUtil.sendJsonResponse(res, 200, retVal.message, null);
    }
});

// logout
router.post('/logout', middlewares.isAuthenticated, (req, res, next) => {
    req.session.destroy();
    genUtil.sendJsonResponse(res, 200, 'Logout successfull', null);
});

// do email confirmation, get because of browser enabled
router.get('/verify_email', async (req, res, next)=>{
    let email = req.query.email || '';
    let emailToken = req.query.emailToken || '';
    let retVal = await userHelper.verifyEmail(email, emailToken);
    genUtil.sendJsonResponse(res, retVal.status ? 200:400, retVal.message, null);
});

// request email confirmation
router.get('/email_confirmation', async (req, res, next)=>{
    let email = req.body.email;
    let retVal = await userHelper.resendEmailConfirmation(email);
    await notifier.notifyEmailConfirmation(retVal.args.user);
    genUtil.sendJsonResponse(res, retVal.status ? 200:400, retVal.message, null);

});

// request password reset
router.get('/password_reset', (req, res, next)=>{
    let email = req.body.email;
    let retVal = userHelper.resendPasswordResetToken(email);
    genUtil.sendJsonResponse(res, retVal.status ? 200:400, retVal.message, null);

});

// reset password
router.post('/password_reset', async (req, res, next) => {
    let email = req.body.email || '';
    let pasword = req.body.password || '';
    let passwordToken = req.body.passwordToken || '';
    
    let retVal = await userHelper.resetPassword(email, passwordToken, pasword);
    genUtil.sendJsonResponse(res, retVal.status ? 200:400, retVal.message, null);
});


/* GET users listing. */
router.get('/', middlewares.isAuthenticated,  async (req, res, next) => {
    if(permissions.canSeeAllUsers(req.session.user)) {
        let page = req.params.page || 0;
        let users = await userHelper.listAllUsers(page, pageLimit);
        genUtil.sendJsonResponse(res, 200, "got list of users", users);
    }
    genUtil.sendJsonResponse(res, 401, 'Unauthorized access', null);
});

/** update profile
 *
 * */
router.put('/:id', middlewares.isAuthenticated, async (req, res, next) => {
    let user = req.session.user;
    let userArgs = req.body;
    let retVal = await userHelper.updateUserDetails(user, userArgs);
    genUtil.sendJsonResponse(res, retVal.status ? 200:400, retVal.message, null);

});

// get profile details
router.get('/:id', middlewares.isAuthenticated, (req, res, next) => {
    let u = models.User.findOne({where:{id: req.params.id}, attributes:['id', 'name', 'email', 'sex', 'role', 'status']});
    genUtil.sendJsonResponse(res, 200, '', u);
});



module.exports = router;