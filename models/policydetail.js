"use strict";
const { Model } = require("sequelize");
const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PolicyDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PolicyDetail.init(
    {
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
    },
    {
      sequelize,
      tableName: "policyDetails",
      modelName: "PolicyDetail",
    }
  );
  return PolicyDetail;
};
