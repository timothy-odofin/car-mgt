const { Vehicle } = require("../models/index");
const message = require("../config/constant");

module.exports = {
  addVehicle: async (req, res) => {
    const {
      vehicleNumber,
      company,
      regNumber,
      color,
      model,
      image,
      ownerId,
      status,
    } = req.body;
    try {
      const vehicle = await Vehicle.create({
        vehicleNumber,
        company,
        regNumber,
        color,
        model,
        image,
        ownerId,
        status,
      });
      return res.json({ status: message.SUCCESS, data: vehicle });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  getAllVehicle: async (req, res) => {
    try {
      const vehicle = await Vehicle.findAll({});
      return res.status(201).json({ status: message.SUCCESS, data: vehicle });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
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
      ownerId,
      status,
    } = req.body;
    try {
      const vehicle = await Vehicle.findOne({ where: { uuid } });
      (vehicle.vehicleNumber = vehicleNumber),
        (vehicle.company = company),
        (vehicle.regNumber = regNumber),
        (vehicle.color = color),
        (vehicle.model = model),
        (vehicle.image = image),
        (vehicle.ownerId = ownerId),
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
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  getVehicle: async (req, res, next) => {
    const uuid = req.params.uuid;
    try {
      const vehicle = await Vehicle.findOne({ where: { uuid } });
      if (!vehicle) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      res.status(200).json({ status: message.SUCCESS, data: vehicle });
    } catch (error) {
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  removeVehicle: async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const vehicle = await Vehicle.findOne({ where: { uuid } });
      await vehicle.destroy();
      if (!vehicle) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_INVALID_NO });
      }
      return res.json({ status: message.SUCCESS, Data: message.DATA_DELETED });
    } catch (error) {
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
