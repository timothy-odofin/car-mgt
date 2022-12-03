'use strict';

const { UUIDV4 } = require('sequelize');

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('transactions', {
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
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: [true, 'cost of transaction must be provided']
      },
      serviceProviderId: {
        type: DataTypes.STRING,
        allowNull: false,
        require: [true, 'serviceProviderId of transaction must be provided']

      },
      vehicleId: {
        type: DataTypes.STRING,
        allowNull: false,
        require: [true, 'vehicleId of transaction must be provided']

      },
      startedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        require: [true, 'startedDate of transaction must be provided']

      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        require: [true, 'endDate of transaction must be provided']

      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      serviceType: {
        type: DataTypes.STRING,
        allowNull: false,
        require: [true, 'serviceType of transaction must be provided']

      },
      transactionStatus: {
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
    await queryInterface.dropTable('transactions');
  }
};