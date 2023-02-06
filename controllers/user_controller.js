const { User } = require("../models/index");
const message = require("../config/constant");
const { Mapper } = require("../utils/app_util");
const { findUserByUUID } = require("../controllers/search");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.findAll({});
      return res
        .status(201)
        .json({ status: message.SUCCESS, data: Mapper.listUser(user) });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  listUserByService: async (req, res) => {
    try {
      const serviceType = req.params.serviceType;
      const user = await User.findAll({
        where: {
          account_type: {
            [Op.like]: `%${serviceType}%`,
          },
        },
      });
      return res
        .status(201)
        .json({ status: message.SUCCESS, data: Mapper.listUser(user) });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  getUser: async (req, res, next) => {
    const uuid = req.params.uuid;
    try {
      const user = await findUserByUUID(uuid, res);
      res
        .status(200)
        .json({ status: message.SUCCESS, data: Mapper.getSingleUser(user) });
    } catch (error) {
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchByPagination: async (req, res) => {
    const pageInteger = Number.parseInt(+req.query.page);
    const sizeInteger = Number.parseInt(+req.query.size);

    let page = 0;
    if (!Number.isNaN(pageInteger) && pageInteger > 0) {
      page = pageInteger;
    }

    let size = 10;
    if (
      !Number.isNaN(sizeInteger) &&
      !(sizeInteger > 10) &&
      !(sizeInteger < 1)
    ) {
      size = sizeInteger;
    }
    const users = await User.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    res.send({
      status: process.env.PAGINATION,
      data: users,
    });
  },

  updateUser: async (req, res) => {
    const uuid = req.params.uuid;
    const { address, aboutUs, category } = req.body;
    try {
      const user = await User.findOne({ where: { uuid } });
      (user.address = address),
        (user.aboutUs = aboutUs),
        (user.category = category);
      await user.save();
      if (!user) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      res.status(200).json({
        status: message.SUCCESS,
        data: {
          message: message.DATA_USER,
        },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  updateServiceList: async (req, res) => {
    const uuid = req.params.uuid;
    const { serviceList } = req.body;
    try {
      const user = await User.findOne({ where: { uuid } });
      (user.account_type = serviceList), await user.save();
      if (!user) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      res.status(200).json({
        status: message.SUCCESS,
        data: {
          message: message.DATA_LIST,
        },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  listUserByAddress: async (req, res) => {
    try {
      const address = req.params.address;
      const user = await User.findAll({
        where: {
          address: {
            [Op.like]: `%${address}%`,
          },
        },
      });
      return res
        .status(201)
        .json({ status: message.SUCCESS, data: Mapper.listUser(user) });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
