const { Transaction } = require("../models/index");
const message = require("../config/constant");

module.exports = {
  createTrans: async (req, res) => {
    const {
      cost,
      serviceProviderId,
      vehicleId,
      startedDate,
      endDate,
      description,
      serviceType,
      transactionStatus,
    } = req.body;

    try {
      const tran = await Transaction.create({
        cost,
        serviceProviderId,
        vehicleId,
        startedDate,
        endDate,
        description,
        serviceType,
        transactionStatus,
      });
      return res.json({ status: message.SUCCESS, data: tran });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  updateTrans: async (req, res) => {
    const uuid = req.params.uuid;
    const {
      cost,
      serviceProviderId,
      vehicleId,
      startedDate,
      endDate,
      description,
      serviceType,
      transactionStatus,
    } = req.body;
    try {
      const tran = await Transaction.findOne({ where: { uuid } });
      tran.cost = cost;
      (tran.serviceProviderId = serviceProviderId),
        (tran.vehicleId = vehicleId),
        (tran.startedDate = startedDate),
        (tran.endDate = endDate),
        (tran.description = description),
        (tran.serviceType = serviceType),
        (tran.transcationStatus = transactionStatus),
        await tran.save();
      if (!tran) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_WRONG });
      }
      return res.status(200).json({ status: message.SUCCESS, data: tran });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  getSingleTrans: async (req, res, next) => {
    const uuid = req.params.uuid;
    try {
      const transaction = await Transaction.findOne({ where: { uuid } });
      if (!transaction) {
        return res
          .status(404)
          .json({ status: message.FAIL, data: message.DATA_WRONG });
      }
      res.status(200).json({ status: message.FAIL, data: transaction });
    } catch (error) {
      return res
        .status(500)
        .json({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },
};
