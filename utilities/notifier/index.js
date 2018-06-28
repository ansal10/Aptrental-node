
const emailUtility = require('./emailer/email_utility');
const util = require('util');
const config = require('../../config/index');

const notifyEmailConfirmation = async (user) => {
    if(process.env.NODE_ENV === 'production') {
        let confirmationUrl = util.format("%s/user/verify_email?email=%s&emailToken=%s", config.baseUrl, user.email, user.emailAttributes.token);
        await emailUtility.sendEmailConfirmationMail(user.name, user.email, confirmationUrl);
    }else{
        console.log('Notifier Mocked..... not a production environment');
    }
};

const notifyPasswordReset = async (user) => {
    if(process.env.NODE_ENV === 'production') {
        await emailUtility.sendPasswordResetTokenMail(user.name, user.email, user.passwordAttributes.token);
    }else{
        console.log('Notifier Mocked..... not a production environment');
    }
};

module.exports = {
    notifyEmailConfirmation: notifyEmailConfirmation,
    notifyPasswordReset: notifyPasswordReset
};
