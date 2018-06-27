
const emailUtility = require('./emailer/email_utility');
const util = require('util');
const config = require('../../config/index');

const notifyEmailConfirmation = async (user) => {
    let confirmationUrl = util.format("%s/user/verify_email?email=%s&emailToken=%s", config.baseUrl, user.email, user.emailAttributes.token);
    await emailUtility.sendEmailConfirmationMail(user.name, user.email, confirmationUrl );
};

const notifyPasswordReset = async (user) => {
    await emailUtility.sendPasswordResetTokenMail(user.name, user.email, user.passwordAttributes.token);
};

module.exports = {
    notifyEmailConfirmation: notifyEmailConfirmation,
    notifyPasswordReset: notifyPasswordReset
};
