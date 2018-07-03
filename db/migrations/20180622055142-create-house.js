'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('houses', {
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

            // rentants related
            rent:{
                type:Sequelize.DOUBLE,
                allowNull: false
            },
            maintenance:{   // monthly, deposit, brokerage, annually
                type:Sequelize.JSONB,
                defaultValue: {}
            },

            // size related
            builtArea:{
                type: Sequelize.DOUBLE,
                allowNull:false
            },
            carpetArea:{
                type: Sequelize.DOUBLE,
                allowNull: false
            },

            // address and location related
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
            address:{
                type:Sequelize.STRING,
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

            // type and availiblity
            type:{
                type:Sequelize.ENUM('1rk', '2rk', '1bhk', '2bhk', '3bhk', '4bhk', '5bhk', '5bhk+')
            },
            availability:{
                type:Sequelize.ENUM('yes', 'no', 'archive'),
                defaultValue: 'archive'
            },
            availableFor:{
                type: Sequelize.ENUM('all', 'family', 'couples', 'bachelors'),
                defaultValue: 'all'
            },
            availableFrom: {
                type:Sequelize.DATE,
                allowNull: false
            },


            floor:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            powerBackup:{
                type: Sequelize.ENUM('full', 'partial', 'no'),
                defaultValue: 'no'
            },
            amenities: {  // type: value ()
                type: Sequelize.JSONB,
                defaultValue: []
            },

            features: {
                type: Sequelize.JSONB, // air conditioned
                defaultValue: []
            },


            tags:{  // array of string
                type: Sequelize.JSONB,
                defaultValue: []
            },

            images:{   // array of urls
                type: Sequelize.JSONB,
                defaultValue: []
            },

            furnishingStatus:{
                type:Sequelize.ENUM('furnished', 'unfurnished', 'semifurnished')
            },

            UserId:{
                type: Sequelize.INTEGER,
                references:{
                    model: 'users',
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
        }).then( async () =>{
            await queryInterface.addIndex('houses', ['rent'], {name: 'houses_rent_index'});
            await queryInterface.addIndex('houses', ['builtArea'], {name: 'houses_builtArea_index'});
            await queryInterface.addIndex('houses', ['carpetArea'], {name: 'houses_carpetArea_index'});
            await queryInterface.addIndex('houses', ['availability'], {name: 'houses_availability_index'});
            await queryInterface.addIndex('houses', ['availableFor'], {name: 'houses_availableFor_index'});
            await queryInterface.addIndex('houses', ['powerBackup'], {name: 'houses_powerBackup_index'});
            await queryInterface.addIndex('houses', ['furnishingStatus'], {name: 'houses_furnishingStatus_index'});
            await queryInterface.addIndex('houses', ['UserId'], {name: 'houses_UserId_index'});
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('houses').then( async () =>{
            await queryInterface.removeIndex('houses', 'houses_rent_index' );
            await queryInterface.removeIndex('houses', 'houses_builtArea_index' );
            await queryInterface.removeIndex('houses', 'houses_carpetArea_index' );
            await queryInterface.removeIndex('houses', 'houses_availability_index' );
            await queryInterface.removeIndex('houses', 'houses_availableFor_index' );
            await queryInterface.removeIndex('houses', 'houses_powerBackup_index' );
            await queryInterface.removeIndex('houses', 'houses_furnishingStatus_index' );
            await queryInterface.removeIndex('houses', 'houses_UserId_index' );
        });
    }
};