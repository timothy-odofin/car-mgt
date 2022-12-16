"use strict";
const { Model } = require("sequelize");
const { UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Vehicle, User, ServiceLog }) {
      // define association here
      this.belongsTo(User, { foreignKey: "service_ownerId", as: "user" });
      this.belongsTo(User, { foreignKey: "service_provideId", as: "user" });
      this.belongsTo(Vehicle, { foreignKey: "vehicleId", as: "vehicle" });
      // this.hasMany(ServiceLog, { foreignKey: "serviceId", as: "servicelog" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        service_ownerId: undefined,
        service_provideId: undefined,
        vehicleId: undefined,
      };
    }
  }
  Service.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      service_provideId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service_ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
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
    },
    {
      sequelize,
      tableName: "services",
      modelName: "Service",
    }
  );
  return Service;
};
