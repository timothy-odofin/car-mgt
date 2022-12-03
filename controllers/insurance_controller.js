const { Insurance } = require("../models/index");
const message = require("../config/constant");

module.exports = {
  addInsurance: async (req, res) => {
    const { classOfNumber, coverType, vehicleUse } = req.body;
    try {
      const insurance = await Insurance.create({
        classOfNumber,
        coverType,
        vehicleUse,
      });
      return res.json({ status: message.SUCCESS, data: insurance });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  editAllInsurance: async (req, res) => {
    try {
      const insurance = await Insurance.findAll({});
      return res.status(201).json({ status: message.SUCCESS, data: insurance });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  singleInsurance: async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const insurance = await Insurance.findOne({ where: { uuid } });
      if (!insurance) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      res.status(200).json({ status: message.SUCCESS, data: insurance });
    } catch (error) {
      res.status(500).json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
