const { Service, ServiceLog, User, Vehicle } = require("../models/index");
const{findUserByUUID,findUserById,findBySingleUser,findVehicleSingle,findSingleServiceByUuid} = require('../controllers/search')
const message = require("../config/constant");
const {Mapper} = require("../utils/app_util");

module.exports = {
  serviceRequest: async (req, res) => {
    const {
      serviceproviderUuid,
      serviceOwnerUuid,
      vehicleUuid,
      service_type,
      owner_complain,
      trans_date,
    } = req.body;
    try {
      const serviceProvider = await findBySingleUser(serviceproviderUuid);
      const serviceOnwer =await findBySingleUser(serviceOwnerUuid);
      const vehicle = await findVehicleSingle(vehicleUuid);
      if (!serviceProvider || !serviceOnwer || !vehicle) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.SERVICE_REQUEST });
      }
      await Service.create({
        service_provideId: serviceProvider.id,
        service_ownerId: serviceOnwer.id,
        service_type: service_type,
        vehicleId: vehicle.id,
        owner_complain: owner_complain,
        service_status: message.DEFAULT_SERVICE_STATUS,
        trans_date: trans_date,
      });
      return res.json({ status: message.SUCCESS, data: message.SERVICE_ADDED });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  addServiceCost: async (req, res) => {
    const{uuid} = req.params;
    const service =await findSingleServiceByUuid(uuid);
    if(!service)
      return res
          .status(404)
          .json({ status: message.FAIL, data: message.SERVICE_NOT_FOUND });
    const { cost, description } = req.body;
    try {
      const service = await Service.update({ cost, description,id:service.id });
      if (!cost || !description) {
        return res.status(400).json({ success: false, data: message.DATA_ALL });
      }
      return res.json({ status: message.SUCCESS, data: service });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchAllService: async (req, res) => {
    try {
      const service = await Service.findAll({raw:true});
      return res.status(201).json({ status: message.SUCCESS, data: Mapper.listService(service) });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  editServiceCost: async (req, res) => {
    const uuid = req.params.uuid;
    const { cost, description } = req.body;
    try {
      const service = await Service.fineOne({ where: { uuid } });
      (service.cost = cost), (service.description = description);
      await service.save();
      if (!service) {
        return res.status(400).json({ success: false, data: message.DATA_ALL });
      }
      return res.status(200).json({ status: SUCCESS, data: message.service });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchByServiceProvider: async (req, res) => {
    res.send("Service Request");
  },

  fetchByOwnerId: async (req, res) => {
    res.send("Service Request");
  },

  fetchByPagination: async (req, res) => {
    const { size, page } = req.params;
    try {
      const service = await Service.findAll({
        limit: size,
        offset: page,
      });
      return res.status(201).json({ status: message.SUCCESS, data: service });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  // Service Log API

  addServiceLog: async (req, res) => {
    const { userUuid, comment, category } = req.body;
    try {
      const user = await User.fineOne({ where: { uuid: userUuid } });
      await ServiceLog.create({
        serviceId: user.id,
        postedById: user.id,
        comment: comment,
        category: category,
      });
      return res
        .status(200)
        .json({ status: SUCCESS, data: message.SERVICELOG_ADDED });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchService: async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const serviceLog = await ServiceLog.fineOne({ where: { uuid } });
      if (!serviceLog) {
        return res
          .status(400)
          .json({ success: false, data: message.DATA_INVALID_NO });
      }
      return res.status(200).json({ status: SUCCESS, data: serviceLog });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchAllServiceLog: async (req, res) => {
    try {
      const serviceLog = await Service.findAll({ include: "services" });
      res.status(201).json({ status: message.SUCCESS, data: serviceLog });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
