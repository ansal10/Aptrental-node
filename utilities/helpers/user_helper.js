const wrap = require('decorator-wrap').wrap;
const validator = require('validator');
const models = require('../../db/models/index');
const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const permission = require('../permisson_utility');

const TIME = {
    EMAIL_TOKEN_EXPIRATION: 24 * 60 * 60, // seconds
    PASSWORD_TOKEN_EXPIRATION: 15 * 60  // seconds

};

const STRS = {
    INVALID_EMAIL: 'Your email is invalid',
    EMAIL_VERIFICATION_FAILED: 'Your email verification failed, probably your link expired or email already verified.',
    PASSWORD_RESET_FAILED: 'Your password token is expired or wrong, in case of expiration you can request a new one.',
    SUCCESSFUL_EMAIL_VERIFICATION: 'Your email is successfully verified',
    SUCCESSFULLY_RESEND_CONFIRMATION_MAIL: 'Confirmation mail is successfully send.',
    SUCCESSFULLY_PASSWORD_TOKEN_SENT: 'Password token been sent successfully',
    SUCCESSFULLY_PASSWORD_RESET: 'Password has been reset successfully',
    SIGNUP_SUCCESSFUL_MESSAGE: 'Signup successful',
    PASSWORD_MIN_LENGTH: 6,
    INVALID_PASSWORD: 'Password should be at least 6 digits long.'

};


const createUserInDatabase = async function (name, email, password, sex) {

    let uuid = uuidv4();
    try {
        let user = await models.User.create({
            email: email,
            name: name,
            emailAttributes: {
                token: uuidv4(),
                created: moment().toISOString(),
                expired: moment().add(TIME.EMAIL_TOKEN_EXPIRATION, 'seconds').toISOString(),
                verified: false
            },
            passwordAttributes: {
                salt: uuid,
                hash: md5(password + uuid),
            },
            sex: sex,
            status: 'active',
            role: 'consumer'
        });

        return {
            status: true,
            message: STRS.SIGNUP_SUCCESSFUL_MESSAGE,
            args: {
                user: user
            }
        };
    }catch (e) {
        return {
            status: false,
            message: e.errors[0].message
        }
    }
};


const verifyEmail = async function (email, email_token) {
    let user = await models.User.findOne({where: {email: validator.trim(email, '').toLowerCase()}});
    if (!user)
        return {status: false, message: STRS.EMAIL_VERIFICATION_FAILED};

    if (user.emailAttributes.token === email_token && moment().toISOString() < user.emailAttributes.expired) {

        user.emailAttributes = Object.assign({}, user.emailAttributes, {
            updated: moment().toISOString(),
            verified: true
        });
        await user.save();

        return {
            status: true,
            message: STRS.SUCCESSFUL_EMAIL_VERIFICATION
        };
    }
    return {status: false, message: STRS.EMAIL_VERIFICATION_FAILED}
};

const resendEmailConfirmation = async function (email) {
    let user = await models.User.findOne({where: {email: validator.trim(email, '').toLowerCase()}});
    if (!user)
        return {status: false, message: STRS.INVALID_EMAIL};
    user.emailAttributes = {
        token: uuidv4(),
        created: moment().toISOString(),
        expired: moment().add(TIME.EMAIL_TOKEN_EXPIRATION, 'seconds').toISOString(),
        verified: false
    };

    await user.save();
    return {
        status: true,
        args: {
            user: user
        },
        message: STRS.SUCCESSFULLY_RESEND_CONFIRMATION_MAIL
    }
};

const resetPassword = async function (email, password_token, password) {
    let user = await models.User.findOne({where: {email: validator.trim(email, '').toLowerCase()}});
    if (!user)
        return {status: false, message: STRS.INVALID_EMAIL};
    if (validator.trim(password, '').length < STRS.PASSWORD_MIN_LENGTH)
        return {status: false, message: STRS.INVALID_PASSWORD};

    if (user.passwordAttributes.token === password_token && moment().toISOString() < user.passwordAttributes.expired) {
        let uuid = uuidv4();
        user.passwordAttributes = {
            salt: uuid,
            hash: md5(uuid + password),
            updated: moment().toISOString()
        };
        await user.save();
        return {status: true, message: STRS.SUCCESSFULLY_PASSWORD_RESET}
    }
    return {status: false, message: STRS.PASSWORD_RESET_FAILED}
};

const resendPasswordResetToken = async function (email) {
    let user = await models.User.findOne({where: {email: validator.trim(email, '').toLowerCase()}});
    if (!user)
        return {status: false, message: STRS.INVALID_EMAIL};

    user.passwordAttributes = {
        token: (Math.floor(Math.random() * 10000000) + 1000000) + '',
        created: moment().toISOString(),
        expired: moment().add(TIME.PASSWORD_TOKEN_EXPIRATION, 'seconds').toISOString()
    };
    await user.save();
    return {
        status: true,
        args: {
            user: user
        },
        message: STRS.SUCCESSFULLY_PASSWORD_TOKEN_SENT
    }

};

const listAllUsers = async (pageNumber, pageLimit) => {
    let users = models.User.findAll({
        limit: pageLimit,
        offset: pageLimit * pageNumber,
        attributes: ['name', 'sex', 'email', 'role', 'status']
    });
    return users;
};

const updateUserDetails = async (updater, userArgs) => {
    let user = await models.User.findOne({where:{id:userArgs.id}});
    if(!user)
        return { status: false, message:'Could not find details of user to be edited'};
    if (permission.canUpdateUser(updater, user)){
        try {
            await models.User.update(userArgs, {where: {is: userArgs.id}});
            return {
                status: true,
                message: 'User updated successfully'
            }
        } catch (e) {
            return {
                status: true,
                message: e.errors[0].message
            }
        }
    }else{
        return { status: false, message: 'You cannot update the user details'}
    }
};

module.exports.createUserInDatabase = createUserInDatabase;
module.exports.verifyEmail = verifyEmail;
module.exports.resendEmailConfirmation = resendEmailConfirmation;
module.exports.resetPassword = resetPassword;
module.exports.resendPasswordResetToken = resendPasswordResetToken;
module.exports.listAllUsers = listAllUsers;
module.exports.updateUserDetails = updateUserDetails;

