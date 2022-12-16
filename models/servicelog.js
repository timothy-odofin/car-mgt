"use strict";
const { Model } = require("sequelize");
const { UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Service }) {
      // define association here
      // this.belongsTo(Service, { foreignKey: "serviceId", as: "service" });
      // this.belongsTo(User, { foreignKey: "postedById", as: "user" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        serviceId: undefined,
        postedById: undefined,
      };
    }
  }
  ServiceLog.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postedById: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "serviceLogs",
      modelName: "ServiceLog",
    }
  );
  return ServiceLog;
};
