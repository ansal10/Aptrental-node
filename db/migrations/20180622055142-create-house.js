'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Houses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull:false

            },
            description: {
                type: Sequelize.STRING(1024),
                allowNull: false
            },
            city:{
                type: Sequelize.STRING,
                allowNull: false
            },
            locality:{
                type: Sequelize.STRING,
                allowNull: false
            },
            country:{
                type: Sequelize.STRING,
                allowNull: false
            },
            latitude:{
                type:Sequelize.DOUBLE,
                defaultValue:0
            },
            longitude:{
                type:Sequelize.DOUBLE,
                defaultValue:0
            },
            tags:{
                type: Sequelize.JSONB,
                defaultValue: {}
            },
            type:{
                type:Sequelize.ENUM('1rk', '2rk', '1bhk', '2bhk', '3bhk', '4bhk', '5bhk', '5bhk+')
            },
            availability:{
                type:Sequelize.ENUM('yes', 'no', 'archive'),
                defaultValue: 'archive'
            },
            images:{
                type: Sequelize.JSONB,
                defaultValue: {}
            },
            floor:{
                type:Sequelize.INTEGER
            },
            areaSize:{
                type:Sequelize.DOUBLE
            },
            carpetSize:{
                type:Sequelize.DOUBLE
            },
            furnishingStatus:{
                type:Sequelize.ENUM('furnished', 'unfurnished', 'semifurnished')
            },
            items:{
                type:Sequelize.JSONB,
                defaultValue:{}
            },
            rate:{
                type:Sequelize.DOUBLE
            },
            UserId:{
                type: Sequelize.INTEGER,
                references:{
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
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
        return queryInterface.dropTable('Houses');
    }
};