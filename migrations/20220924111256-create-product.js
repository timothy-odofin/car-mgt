'use strict';

const { UUIDV4 } = require('sequelize')

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: [true, 'Name of the product must be  provided']
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avaliable_quatity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: [true, 'Name of the product must be  provided']

      },
      postedBy: {
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
    await queryInterface.dropTable('products');
  }
};