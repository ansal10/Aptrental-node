'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                allowNull:false,
                unique:true
            },
            passwordHash: {
                type: Sequelize.STRING,
                allowNull: true
            },
            passwordSalt: {
                type: Sequelize.UUID,
                allowNull: true
            },
            emailVerified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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