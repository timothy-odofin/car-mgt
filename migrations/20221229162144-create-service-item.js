"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("serviceItems", {
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
      serviceId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      salePrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable("serviceItems");
  },
};