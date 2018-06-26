
let env = process.env.NODE_ENV || 'development';
let x = require('./dev_config.js');
module.exports = {
    ...x
};