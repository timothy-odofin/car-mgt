const { Product, User, Vehicle,Service,ServiceLog } = require("../models/index");
const message = require("../config/constant");

module.exports.findUserByUUID = async (userUuid, response) => {
  const user = await User.findOne({ where: { uuid: userUuid }, raw: true });
  if(user)
    return user
  else
   return response
      .status(201)
      .json({ status: message.FAIL, data: message.USER_NOT_FOUND });
};

module.exports.findBySingleUser =  (userUuid) => {
  return   User.findOne({ where: { uuid: userUuid }, raw: true });
};

module.exports.findUserById =  (id) => {
 return  User.findOne({ where: { id: id }, raw: true });

};
module.exports.findProductByUUID = async (userUuid, response) => {
  const product = await Product.findOne({
    where: { uuid: userUuid },
    raw: true,
  });
  if (!product)
    response
      .status(201)
      .json({ status: message.FAIL, data: message.USER_NOT_FOUND });
  return product;
};

module.exports.findVehicleByUUID = async (userUuid, response) => {
  const vechicle = await Vehicle.findOne({
    where: { uuid: userUuid },
    raw: true,
  });
  if (!vechicle)
    response
      .status(201)
      .json({ status: message.FAIL, data: message.VEHICLE_NOT_FOUND });
  return vechicle;
};

module.exports.findInsuranceByUUID = async (userUuid, response) => {
  const vechicle = await Vehicle.findOne({
    where: { uuid: userUuid },
    raw: true,
  });
  if (!vechicle)
    response
      .status(201)
      .json({ status: message.FAIL, data: message.VEHICLE_NOT_FOUND });
  return vechicle;
};

module.exports.findVehicleById = async (id) => {
  return await Vehicle.findOne({ where: { id: id }, raw: true });

};

module.exports.findVehicleSingle =  (userUuid) => {
  return  Vehicle.findOne({
    where: { uuid: userUuid },
    raw: true,
  });

};


module.exports.findSingleServiceByUuid =  (userUuid) => {
  return   Service.findOne({ where: { uuid: userUuid }, raw: true });
};

module.exports.findSingleServiceByUuidV2 = async (userUuid, response) => {
 return await Service.findOne({ where: { uuid: userUuid }, raw: true });

};

module.exports.findServiceConversationByUUID = async (uuid) => {
  return await ServiceLog.findOne({ where: { uuid: uuid }, raw: true });

};

module.exports.deleteServiceConversationByUUID = async ({id}) => {
  await ServiceLog.destroy({ where: { id: id } });
};

module.exports.updateService = async ({serviceId,postedById,comment, category,  cost}) => {
    await Service.update({ cost:cost,service_status: "In Progress"},{where: {id: serviceId}});
    await ServiceLog.create({serviceId: serviceId,postedById: postedById, Comment: comment,category:category });
};

module.exports.addServiceConversation = async ({serviceId,postedById,comment, category}) => {
  await ServiceLog.create({serviceId: serviceId,postedById: postedById, Comment: comment,category:category });
  await Service.update({ service_status: category},{where: {id: serviceId}});
};


module.exports.listServiceLogByServiceId = async ({serviceId}) => {
  return await ServiceLog.findAll({where:{serviceId: serviceId}, raw:true, order: [
      ['id', 'DESC']
    ], });
};
