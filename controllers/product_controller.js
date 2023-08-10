const { Product } = require("../models/index");
const message = require("../config/constant");
const appUtil = require("../controllers/search");
const { Mapper } = require("../utils/app_util");

module.exports = {
  addProduct: async (req, res) => {
    const {
      name,
      description,
      avaliable_quatity,
      unit_price,
      userProviderUuid,
    } = req.body;
    try {
      const userProvider = await appUtil.findBySingleUser(userProviderUuid);
      if (!userProvider) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.SERVICE_REQUEST });
      }
      await Product.create({
        name: name,
        description: description,
        avaliable_quatity: avaliable_quatity,
        unit_price: unit_price,
        postedById: userProvider.id,
      });
      return res.json({
        status: message.SUCCESS,
        data: message.PRODUCT_ADDED,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchProduct: async (req, res) => {
    try {
      const product = await Product.findAll({});
      return res.status(201).json({
        status: message.SUCCESS,
        data: await Mapper.listProduct(product),
      });
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
      res.status(200).json({
        status: message.SUCCESS,
        data: await Mapper.getSingleProduct(product),
      });
    } catch (error) {
      res.status(500).json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  removeProduct: async (req, res) => {
    const uuid = req.params.uuid;
    try {
      await Product.destroy({ where: { uuid } });
      return res.json({
        status: message.SUCCESS,
        Data: message.DATA_DELETED,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
