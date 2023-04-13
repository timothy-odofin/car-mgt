const { PolicyDetail } = require("../models/index");
const message = require("../config/constant");
const appUtil = require("../controllers/search");
const { Mapper } = require("../utils/app_util");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

module.exports = {
  policyDetails: async (req, res) => {
    const { ownerId, vehicleId, policyHoldler, companyName, nin, issueDate } =
      req.body;
    try {
      const insuranceOwner = await appUtil.findBySingleUser(ownerId);
      const vehicle = await appUtil.findVehicleSingle(vehicleId);
      if (!insuranceOwner || !vehicle) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.POLICYDETAILS_REQUEST });
      }
      await PolicyDetail.create({
        ownerId: insuranceOwner.id,
        vehicleId: vehicle.id,
        policyHoldler: policyHoldler,
        companyName: companyName,
        nin: nin,
        issueDate: issueDate,
      });
      return res.json({
        status: message.SUCCESS,
        data: message.POLICYDETAILS_ADDED,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchAllPolicy: async (req, res) => {
    try {
      const policy = await PolicyDetail.findAll({ raw: true });
      return res.status(200).json({
        status: message.SUCCESS,
        data: await Mapper.listPolicyDetail(policy),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  updatePolicyDetail: async (req, res) => {
    const uuid = req.params.uuid;
    const { state, lga, address } = req.body;
    try {
      const policy = await PolicyDetail.findOne({ where: { uuid } });
      if (!policy) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.POLICYDETAIL_NOT_FOUND });
      }
      (policy.state = state),
        (policy.lga = lga),
        (policy.address = address),
        await policy.save();

      res.status(200).json({
        status: message.SUCCESS,
        data: {
          message: message.DATA_POLICYDETAIL,
        },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
  getPolicyDetail: asyncWrapper(async (req, res, next) => {
    const uuid = req.params.uuid;
    const policy = await PolicyDetail.findOne({ where: { uuid } });
    if (!policy) {
      return next(
        createCustomError("Account with such credential not found", 404)
      );
    }
    res.status(200).json({ status: message.SUCCESS, data: policy });
  }),

  removePolicyDetail: async (req, res) => {
    const uuid = req.params.uuid;
    try {
      await PolicyDetail.destroy({ where: { uuid } });
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
