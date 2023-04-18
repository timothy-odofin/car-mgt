"use strict";
const { Model } = require("sequelize");
const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Insurance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Insurance.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      classOfInsurance: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coverType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleUse: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "insurances",
      modelName: "Insurance",
    }
  );
  return Insurance;
};
