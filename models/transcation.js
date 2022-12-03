'use strict';
const {
  Model
} = require('sequelize');

const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Transaction.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    serviceProviderId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicleId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transactionStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'transactions',
    modelName: 'Transaction',
  });
  return Transaction;
};