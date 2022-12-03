'use strict';

const { UUIDV4 } = require("sequelize");


module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('insurances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4
      },
      classOfNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      coverType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      vehicleUse: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('insurances');
  }
};