const { Service, ServiceLog, User, Vehicle } = require("../models/index");
const appUtil = require("../controllers/search");
const message = require("../config/constant");
const { Mapper } = require("../utils/app_util");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
      const serviceProvider = await appUtil.findBySingleUser(
        serviceproviderUuid
      );
      const serviceOnwer = await appUtil.findBySingleUser(serviceOwnerUuid);
      const vehicle = await appUtil.findVehicleSingle(vehicleUuid);
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

  updateServiceCost: async (req, res) => {
    const { uuid } = req.params;
    const { cost, description, postedBy } = req.body;
    if (!cost || !description || !uuid || !postedBy) {
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_ALL });
    }
    const service = await appUtil.findSingleServiceByUuidV2(uuid);
    const postedUser = await appUtil.findUserByUUID(postedBy, res);
    if (!postedUser || !service)
      return res.json({ status: message.FAIL, data: message.RECORD_NOT_FOUND });
    try {
      await appUtil.updateService({
        serviceId: service["id"],
        postedById: postedUser.id,
        comment: description,
        category: "Cost",
        cost: cost,
      });
      return res.json({
        status: message.SUCCESS,
        data: message.UPDATE_SUCCESSFUL,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchAllService: async (req, res) => {
    try {
      const service = await Service.findAll({ raw: true });
      return res.status(201).json({
        status: message.SUCCESS,
        data: await Mapper.listService(service),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchByServiceProvider: async (req, res) => {
    try {
      const { uuid } = req.params;
      const user = await appUtil.findUserByUUID(uuid, res);
      const service = await Service.findAll({
        where: { service_provideId: user.id },
        raw: true,
        order: [["id", "DESC"]],
      });
      return res.status(201).json({
        status: message.SUCCESS,
        data: await Mapper.listService(service),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
  filterALlService: async (req, res) => {
    try {
      const { uuid } = req.params;
      const user = await appUtil.findUserByUUID(uuid, res);
      const service = await Service.findAll({
        where: {
          [Op.or]: [
            { service_provideId: user.id },
            { service_ownerId: user.id },
          ],
        },
        raw: true,
        order: [["id", "DESC"]],
      });
      return res.status(201).json({
        status: message.SUCCESS,
        data: await Mapper.listService(service),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  fetchByOwnerId: async (req, res) => {
    try {
      const { ownerId } = req.params;
      const user = await appUtil.findUserByUUID(ownerId, res);
      const service = await Service.findAll({
        where: { service_ownerId: user.id },
        raw: true,
        order: [["id", "DESC"]],
      });
      return res.status(201).json({
        status: message.SUCCESS,
        data: await Mapper.listService(service),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  /////////////ServiceLog Controller ///////

  addServiceLog: async (req, res) => {
    const { serviceId } = req.params;
    const { postedBy, comment, category } = req.body;
    if (!postedBy || !comment || !serviceId || !category) {
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_ALL });
    }
    const service = await appUtil.findSingleServiceByUuidV2(serviceId);
    const postedUser = await appUtil.findUserByUUID(postedBy, res);
    if (!postedUser || !service)
      return res.json({ status: message.FAIL, data: message.RECORD_NOT_FOUND });

    try {
      await appUtil.addServiceConversation({
        serviceId: service["id"],
        postedById: postedUser.id,
        comment: comment,
        category: category,
      });
      return res
        .status(200)
        .json({ status: message.SUCCESS, data: message.UPDATE_SUCCESSFUL });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  listServiceConversationByServiceId: async (req, res) => {
    const serviceId = req.params.serviceId;
    if (!serviceId) {
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_ALL });
    }
    try {
      const service = await appUtil.findSingleServiceByUuidV2(serviceId);
      if (!service) {
        return res
          .status(200)
          .json({ status: message.FAIL, data: message.RECORD_NOT_FOUND });
      }
      const resultList = await appUtil.listServiceLogByServiceId({
        serviceId: service.id,
      });
      return res.status(200).json({
        status: message.SUCCESS,
        data: await Mapper.listServiceConversation(resultList),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  deleteServiceConversation: async (req, res) => {
    const uuid = req.params.uuid;
    if (!uuid) {
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_ALL });
    }
    try {
      const service = await appUtil.findServiceConversationByUUID(uuid);
      if (!service) {
        return res
          .status(200)
          .json({ status: message.FAIL, data: message.RECORD_NOT_FOUND });
      }
      await appUtil.deleteServiceConversationByUUID({ id: service.id });
      return res
        .status(200)
        .json({ status: message.SUCCESS, data: message.RECORD_DELETED });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  //ServiceItem Controller
  addItem: async (req, res) => {
    const { serviceId } = req.params;
    const { itemName, qty, salePrice } = req.body;
    if (!itemName || !qty || !serviceId || !salePrice) {
      return res
        .status(400)
        .json({ status: message.FAIL, data: message.DATA_ALL });
    }
    const service = await appUtil.findSingleServiceByUuidV2(serviceId);
    if (!service)
      return res.json({
        status: message.FAIL,
        data: message.RECORD_NOT_FOUND,
      });

    try {
      await appUtil.addServiceItem({
        serviceId: service["id"],
        itemName: itemName,
        qty: qty,
        salePrice: salePrice,
        amount: qty * salePrice,
      });
      return res
        .status(200)
        .json({ status: message.SUCCESS, data: message.UPDATE_SUCCESSFUL });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  listItem: async (req, res) => {
    const serviceId = req.params.serviceId;
    if (!serviceId) {
      return res
        .status(200)
        .json({ status: message.FAIL, data: message.DATA_ALL });
    }
    try {
      const service = await appUtil.findSingleServiceByUuidV2(serviceId);
      if (!service) {
        return res
          .status(200)
          .json({ status: message.FAIL, data: message.RECORD_NOT_FOUND });
      }
      const itemList = await appUtil.listServiceItemByServiceId({
        serviceId: service.id,
      });
      return res.status(200).json({
        status: message.SUCCESS,
        data: await Mapper.listServiceItem(itemList),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
