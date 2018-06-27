
let env = process.env.NODE_ENV || 'development';
let x = require('./dev_config.js');
module.exports = {
    ...x,
    baseUploadDir: 'uploads',
    baseImageUploadDir: 'image',
    smtpConfig: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'shubhamdemo1992@gmail.com',
            pass: 'Pass@1234'
        }
    },

};