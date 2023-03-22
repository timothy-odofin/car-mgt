const { Vehicle, User } = require("../models/index");
const message = require("../config/constant");
const axios = require("axios");
const appUtil = require("../controllers/search");
const { Mapper } = require("../utils/app_util");
const vehicleURL = "https://swipe.fund:7575/paga/verification/vin?vin=";

module.exports = {
  verifyVehicle: async (req, res) => {
    try {
      // const body = req.body;
      const { vin } = req.params;
      const response = await axios.post(vehicleURL + vin, {});
      res.send(response.data);
    } catch (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        res.status(status).send(statusText);
      } else res.status(404).send(error);
    }
  },

  addVehicle: async (req, res) => {
    const {
      vehicleNumber,
      company,
      regNumber,
      color,
      model,
      image,
      userProviderUuid,
      status,
    } = req.body;
    try {
      const postedUser = await appUtil.findBySingleUser(userProviderUuid);
      if (!userProviderUuid)
        return res.json({
          status: message.FAIL,
          data: message.RECORD_NOT_FOUND,
        });
      await Vehicle.create({
        vehicleNumber: vehicleNumber,
        company: company,
        regNumber: regNumber,
        color: color,
        model: model,
        image: image,
        ownerId: postedUser.id,
        status: status,
      });
      return res.json({ status: message.SUCCESS, data: message.VEHICLE_ADDED });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  getAllVehicle: async (req, res) => {
    try {
      const vehicle = await Vehicle.findAll({ raw: true });
      return res
        .status(200)
        .json({ status: message.SUCCESS, data: await Mapper.listCar(vehicle) });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  vehicleUpdate: async (req, res) => {
    const uuid = req.params.uuid;
    const {
      vehicleNumber,
      company,
      regNumber,
      color,
      model,
      image,
      userProviderUuid,
      status,
    } = req.body;
    try {
      const postedUser = await appUtil.findBySingleUser(userProviderUuid);
      const vehicle = await Vehicle.findOne({ where: { uuid } });
      (vehicle.vehicleNumber = vehicleNumber),
        (vehicle.company = company),
        (vehicle.regNumber = regNumber),
        (vehicle.color = color),
        (vehicle.model = model),
        (vehicle.image = image),
        (vehicle.postedUser = postedUser.id),
        (vehicle.status = status),
        await vehicle.save();
      if (!vehicle) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      return res.status(200).json({ status: message.SUCCESS, data: vehicle });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  getVehicle: async (req, res, next) => {
    const uuid = req.params.uuid;
    try {
      const vehicle = await Vehicle.findOne({ where: { uuid } });
      res.status(200).json({
        status: message.SUCCESS,
        data: await Mapper.getFullVehicle(vehicle),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  removeVehicle: async (req, res) => {
    const uuid = req.params.uuid;
    try {
      await Vehicle.destroy({ where: { uuid } });
      return res.json({ status: message.SUCCESS, Data: message.DATA_DELETED });
    } catch (error) {
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
  //No issue with the application
  getAllVehicleByOwner: async (req, res) => {
    try {
      const { ownerId } = req.params;
      const user = await appUtil.findUserByUUID(ownerId, res);
      const service = await Vehicle.findAll({
        where: { ownerId: user.id },
        raw: true,
        order: [["id", "DESC"]],
      });
      return res.status(200).json({
        status: message.SUCCESS,
        data: await Mapper.listCar(service),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
