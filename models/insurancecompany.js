"use strict";
const { Model } = require("sequelize");
const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InsuranceComp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InsuranceComp.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "insuranceComps",
      modelName: "InsuranceComp",
    }
  );
  return InsuranceComp;
};
