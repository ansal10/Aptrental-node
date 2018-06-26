'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,

            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                allowNull:false,
                unique:true,

            },

            emailAttributes: {              // token, created, expired, updated, verified
                type: Sequelize.JSONB,
                defaultValue: {}
            },
            passwordAttributes:{           // token, created, expired, updated, hash, salt
                type: Sequelize.JSONB,
                defaultValue: {}
            },
            role: {
                type: Sequelize.ENUM('admin', 'realtor', 'consumer'),
                defaultValue: 'consumer'
            },
            status:{
                type: Sequelize.ENUM('active', 'inactive'),
                defaultValue: 'active'
            },
            sex: {
                type: Sequelize.ENUM('male', 'female', 'other')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};