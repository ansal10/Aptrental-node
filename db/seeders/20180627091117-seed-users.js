const faker = require('faker');
const md5 = require('md5');
const _ = require('underscore');
const moment = require('moment');
module.exports = {
    up: (queryInterface, Sequelize) => {

        let users = [
            {
                name: 'Shubham Agrawal Admin',
                email: 'manovagyanik1@gmail.com',
                emailAttributes: JSON.stringify({
                    verified: true
                }),
                passwordAttributes: JSON.stringify({
                    salt: '1234',
                    hash: md5('pass1234' + '1234')
                }),
                role: 'admin',
                status: 'active',
                sex: 'male',
                createdAt: moment().toISOString(),
                updatedAt: moment().toISOString()
            },
            {
                name: 'Shubham Agrawal Realtor',
                email: 'manov.agyanik1@gmail.com',
                emailAttributes: JSON.stringify({
                    verified: true
                }),
                passwordAttributes: JSON.stringify({
                    salt: '1234',
                    hash: md5('pass1234' + '1234')
                }),
                role: 'realtor',
                status: 'active',
                sex: 'male',
                createdAt: moment().toISOString(),
                updatedAt: moment().toISOString()
            },
            {
                name: 'Shubham Agrawal Admin',
                email: 'manovagya.nik1@gmail.com',
                emailAttributes: JSON.stringify({
                    verified: true
                }),
                passwordAttributes: JSON.stringify({
                    salt: '1234',
                    hash: md5('pass1234' + '1234')
                }),
                role: 'consumer',
                status: 'active',
                sex: 'male',
                createdAt: moment().toISOString(),
                updatedAt: moment().toISOString()
            }
        ];

        for (let i = 0; i < 100; i++) {
            users.push({
                name: faker.name.findName(),
                email: faker.internet.email(),
                emailAttributes: JSON.stringify({
                    verified: true
                }),
                passwordAttributes: JSON.stringify({
                    salt: '1234',
                    hash: md5('pass1234' + '1234')
                }),
                role: _.sample(['admin', 'realtor', 'consumer']),
                status: _.sample(['active', 'inactive']),
                sex: _.sample(['male', 'female', 'other']),
                createdAt: moment().toISOString(),
                updatedAt: moment().toISOString()
            })
        }
        return queryInterface.bulkInsert('Users', users, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
