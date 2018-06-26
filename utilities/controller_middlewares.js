const genUtil = require('../utilities/genutils/index');


const isAuthenticated =  (req, res, next) => {
    let session = req.session;
    if (session.user)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    genUtil.sendJsonResponse(res, 401, "Unauthorized access", null);
};


module.exports.isAuthenticated = isAuthenticated;