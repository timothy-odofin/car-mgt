const { Insurance, InsuranceComp } = require("../models/index");
const message = require("../config/constant");
const { Mapper } = require("../utils/app_util");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

module.exports = {
  addInsurance: asyncWrapper(async (req, res) => {
    const { classOfNumber, coverType, vehicleUse } = req.body;
    const insurance = await Insurance.create({
      classOfNumber,
      coverType,
      vehicleUse,
    });
    return res.json({ status: message.SUCCESS, data: insurance });
  }),

  editAllInsurance: asyncWrapper(async (req, res) => {
    const insurance = await Insurance.findAll({});
    return res
      .status(201)
      .json({ status: message.SUCCESS, data: Mapper.listInsurance(insurance) });
  }),

  singleInsurance: asyncWrapper(async (req, res, next) => {
    const uuid = req.params.uuid;
    const insurance = await Insurance.findOne({ where: { uuid } });
    if (!insurance) {
      return next(
        createCustomError("Account with such credential not found", 404)
      );
    }
    res
      .status(200)
      .json({ status: message.SUCCESS, data: Mapper.listInsurance(insurance) });
  }),

  removeInsurance: async (req, res) => {
    const uuid = req.params.uuid;
    try {
      await Insurance.destroy({ where: { uuid } });
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

  //Insurance Company APIs
  addInsuranceCompany: asyncWrapper(async (req, res) => {
    const { name, logo, website } = req.body;
    const insuranceCompany = await InsuranceComp.create({
      name,
      logo,
      website,
    });
    return res.json({ status: message.SUCCESS, data: insuranceCompany });
  }),

  listAllInsuranceCompany: asyncWrapper(async (req, res) => {
    const insuranceCompany = await InsuranceComp.findAll({});
    return res
      .status(201)
      .json({ status: message.SUCCESS, data: insuranceCompany });
  }),

  singleInsuranceCompany: asyncWrapper(async (req, res, next) => {
    const uuid = req.params.uuid;
    const insurance = await InsuranceComp.findOne({ where: { uuid } });
    if (!insurance) {
      return next(
        createCustomError("Account with such credential not found", 404)
      );
    }
    res.status(200).json({ status: message.SUCCESS, data: insurance });
  }),

  removeInsuranceCompany: async (req, res) => {
    const uuid = req.params.uuid;
    try {
      await InsuranceComp.destroy({ where: { uuid } });
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
  // THE END

  vehicleTypes: async (req, res) => {
    res.status(200).json({
      status: message.SUCCESS,
      data: [
        "Private motor",
        "Motor cycle(Power bike/Offical ride)",
        "Tricycle(Keke Napep)",
        "Commercial(Own Good/ Staff bus)",
        "Commercial(Trucks/ General cartage)",
        "Fear paying passenge Bus",
      ],
    });
  },
};
