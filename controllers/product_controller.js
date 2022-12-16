const { Product, User } = require("../models/index");
const message = require("../config/constant");

module.exports = {
  addProduct: async (req, res) => {
    console.log(req.body);
    const { name, description, avaliable_quatity, unit_price, userUuid } =
      req.body;

    try {
      const user = await User.findOne({ where: { uuid: userUuid } });
      const product = await Product.create({
        name,
        description,
        avaliable_quatity,
        unit_price,
        postedById: user.id,
      });
      return res.json({
        status: message.SUCCESS,
        data: product,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(404)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchProduct: async (req, res) => {
    try {
      const product = await Product.findAll({ include: "user" });
      res.status(201).json({ status: message.SUCCESS, data: product });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchProductPagination: async (req, res) => {
    const { page, size } = req.params;
    try {
      const product = await Product.findAll({
        limit: size,
        offset: page,
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
        return res.status(404).json({ status: process.env.ERROR });
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
        return res.status(404).json({ status: process.env.ERROR });
      }
      return res.json({
        Status: process.env.SUCCESS,
        data: message.DATA_DELETED,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
