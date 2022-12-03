const { Product } = require("../models/index");
const message = require("../config/constant");

module.exports = {
  addProduct: async (req, res) => {
    const { name, description, avaliable_quatity, unit_price, postedBy } =
      req.body;
    try {
      const product = await Product.create({
        name,
        description,
        avaliable_quatity,
        unit_price,
        postedBy,
      });
      return res.json({ status: message.SUCCESS, data: product });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  editAllProduct: async (req, res) => {
    try {
      const product = await Product.findAll({});
      res.status(201).json({ status: message.SUCCESS, data: product });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchProductPagination: async (req, res) => {
    try {
      const product = await Product.findAll({
        limit: 2,
        offset: 2,
      });
      return res.status(201).json({ status: message.SUCCESS, data: product });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  getProduct: async (req, res, next) => {
    const uuid = req.params.uuid;
    try {
      const product = await Product.findOne({ where: { uuid } });
      if (!product) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      res.status(200).json({ status: message.SUCCESS, data: product });
    } catch (error) {
      res.status(500).json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  removeProduct: async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const product = await Product.findOne({ where: { uuid } });
      await product.destroy();
      if (!product) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      return res.json({ status: message.SUCCESS, data: DELETED });
    } catch (error) {
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
