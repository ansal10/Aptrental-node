'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
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
                allowNull: false,
                unique: true,

            },

            emailAttributes: {              // token, created, expired, updated, verified
                type: Sequelize.JSONB,
                defaultValue: {}
            },
            passwordAttributes: {           // token, created, expired, updated, hash, salt
                type: Sequelize.JSONB,
                defaultValue: {}
            },
            role: {
                type: Sequelize.ENUM('admin', 'realtor', 'consumer'),
                defaultValue: 'consumer'
            },
            status: {
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
        }).then( async () =>{
            await queryInterface.addIndex('users', ['role'], {name: 'users_role_index'});
            await queryInterface.addIndex('users', ['status'], {name: 'users_status_index'});
            await queryInterface.addIndex('users', ['sex'], {name: 'users_sex_index'});
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users').then( async ()=>{
            await queryInterface.removeIndex('users', 'users_role_index');
            await queryInterface.removeIndex('users', 'users_status_index');
            await queryInterface.removeIndex('users', 'users_sex_index');
        });
    }
};