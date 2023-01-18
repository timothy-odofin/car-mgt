"use strict";
const { UUIDV4 } = require("sequelize");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // this.belongsTo(User, { foreignKey: "postedById", as: "user" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, postedById: undefined };
    }
  }
  Product.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avaliable_quatity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postedById: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "products",
      modelName: "Product",
    }
  );
  return Product;
};
