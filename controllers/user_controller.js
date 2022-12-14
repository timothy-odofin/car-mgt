const { User } = require("../models/index");
const message = require("../config/constant");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.findAll({});
      return res.status(201).json({ status: message.SUCCESS, data: user });
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
      const user = await User.findOne({ where: { uuid } });
      if (!user) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      res.status(200).json({ status: message.SUCCESS, data: user });
    } catch (error) {
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchByPagination: async (req, res) => {
    const { size, page } = req.params;
    try {
      const user = await User.findAll({
        limit: size,
        offset: page,
      });
      return res.status(201).json({ status: message.SUCCESS, data: user });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  updateUser: async (req, res) => {
    const uuid = req.params.uuid;
    const {
      firstName,
      lastName,
      name,
      email,
      phone,
      contact,
      address,
      password,
      photograph,
      account_type,
      account_disable,
      category,
    } = req.body;
    try {
      const user = await User.findOne({ where: { uuid } });

      (user.firstName = firstName),
        (user.lastName = lastName),
        (user.name = name),
        (user.email = email),
        (user.phone = phone),
        (user.contact = contact),
        (user.address = address),
        (user.password = password),
        (user.photograph = photograph),
        (user.account_type = account_type),
        (user.account_disable = account_disable),
        (user.category = category);
      await user.save();
      if (!user) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      res.status(200).json({ status: message.SUCCESS, data: user });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
