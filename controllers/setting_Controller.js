const { Setting, State } = require("../models/index");
const message = require("../config/constant");

module.exports = {
  getLga: async (req, res) => {
    const searchLga = req.params.stateName;
    try {
      const lgaList = await State.findAll({ where: { stateName: searchLga } });
      if (!lgaList) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      res
        .status(200)
        .json({ status: message.SUCCESS, data: lgaList.map((rs) => rs.lga) });
    } catch (error) {
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  carDetails: async (req, res) => {
    res.status(200).json({
      status: message.SUCCESS,
      data: ["State", "Vehicle Model", "Vehicle Color", "Vehicle Make"],
    });
  },

  getCategoryList: async (req, res) => {
    const searchCategory = req.params.category;
    try {
      const fatchcategory = await Setting.findAll({
        where: { category: searchCategory },
        raw: true,
      });
      if (!fatchcategory) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      res.status(200).json({ data: fatchcategory.map((rs) => rs.description) });
    } catch (error) {
      return res
        .status(500)
        .json({ status: message.FAIL, status: process.env.DATA_WRONG });
    }
  },
};
