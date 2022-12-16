"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      service_provideId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      service_ownerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      service_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cost: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      owner_complain: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      service_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trans_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("services");
  },
};
