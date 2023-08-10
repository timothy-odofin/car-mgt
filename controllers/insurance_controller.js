const { Insurance, InsuranceComp } = require("../models/index");
const message = require("../config/constant");
const { Mapper } = require("../utils/app_util");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

module.exports = {
  addInsurance: asyncWrapper(async (req, res) => {
    const { classOfInsurance, coverType, vehicleUse } = req.body;
    const insurance = await Insurance.create({
      classOfInsurance,
      coverType,
      vehicleUse,
    });
    return res.json({ status: message.SUCCESS, data: insurance });
  }),

  getAllInsurance: async (req, res) => {
    try {
      const insurance = await Insurance.findAll({ raw: true });
      return res.status(200).json({
        status: message.SUCCESS,
        data: await Mapper.listInsurance(insurance),
        nbHits: insurance.length,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  singleInsurance: async (req, res, next) => {
    const uuid = req.params.uuid;
    try {
      const insurance = await Insurance.findOne({ where: { uuid } });
      res.status(200).json({
        status: message.SUCCESS,
        data: await Mapper.getSingleInsurance(insurance),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  removeInsurance: asyncWrapper(async (req, res) => {
    const uuid = req.params.uuid;

    await Insurance.destroy({ where: { uuid } });
    return res.json({
      status: message.SUCCESS,
      Data: message.DATA_DELETED,
    });
  }),

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
    const insurance = await InsuranceComp.findAll({});
    return res.status(201).json({
      status: message.SUCCESS,
      data: await Mapper.listInsuranceCompany(insurance),
      nbHits: insurance.length,
    });
  }),

  singleInsuranceCompany: asyncWrapper(async (req, res, next) => {
    const uuid = req.params.uuid;
    const insurance = await InsuranceComp.findOne({ where: { uuid } });
    if (!insurance) {
      return next(
        createCustomError("Account with such credential not found", 404)
      );
    }
    res.status(200).json({
      status: message.SUCCESS,
      data: await Mapper.getSingleInsuranceCompany(insurance),
    });
  }),

  removeInsuranceCompany: asyncWrapper(async (req, res) => {
    const uuid = req.params.uuid;

    await InsuranceComp.destroy({ where: { uuid } });
    return res.json({
      status: message.SUCCESS,
      Data: message.DATA_DELETED,
    });
  }),
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
