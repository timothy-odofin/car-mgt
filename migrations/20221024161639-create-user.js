'use strict';

const { UUIDV4 } = require("sequelize");


module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      accountStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false

      },
      activationOtp: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        min: 6,
        max: 255
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        min: 6,
        max: 255
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        min: 6,
        max: 255
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        max: 255,
        min: 6,

      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        min: 6,
        max: 1024
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        min: 11,
        max: 33
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      photograph: {
        type: DataTypes.STRING,
        allowNull: true
      },
      account_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      account_disable: {
        type: DataTypes.STRING,
        allowNull: true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
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
    await queryInterface.dropTable('users');
  }
};
