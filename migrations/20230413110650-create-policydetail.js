"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("policyDetails", {
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
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      policyHoldler: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lga: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("policyDetails");
  },
};
