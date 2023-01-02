const { findVehicleById, findUserById, listServiceItemByServiceId} = require("../controllers/search");

function findVehicle(id) {
  findVehicleById(id)
    .then(function (row) {
      return row;
    })
    .then((error) => {
      console.log(error);
      return null;
    });
}
const Mapper = {
  listUser(userList) {
    const userResponse = [];
    if (userList) {
      userList.forEach((user) => {
        userResponse.push(this.getSingleUser(user));
      });
    }
    return userResponse;
  },
  getSingleUser(user) {
    return {
      uuid: user["uuid"],
      accountStatus: user["accountStatus"],
      firstName: user["firstName"],
      lastName: user["lastName"],
      email: user["email"],
      phone: user["phone"],
      category: user["category"],
      serviceList: user["account_type"],
      createdAt: user["createdAt"],
      address: user["address"] === null ? "NA" : user["address"],
    };
  },
  getPartialUser(user) {
    return {
      uuid: user["uuid"],
      firstName: user["firstName"],
      lastName: user["lastName"],
      phone: user["phone"],
    };
  },
  getPartialVehicle(user) {
    return {
      uuid: user["uuid"],
      vehicleNumber: user["vehicleNumber"],
      company: user["company"],
    };
  },
  getSingleServiceItem(user) {
    return {
      uuid: user["uuid"],
      serviceId: user["serviceId"],
      itemName: user["itemName"],
      qty: user["qty"],
      salePrice: user["salePrice"],
      amount: user["amount"]
    };
  },
  listItem(itemList) {
    const userResponse = [];
    if (itemList) {
      itemList.forEach((item) => {
        userResponse.push(this.getSingleServiceItem(item));
      });
    }
    return userResponse;
  },
  async getSingleService(service) {
    const serviceProvider = await findUserById(service["service_provideId"]);
    const serviceOwner = await findUserById(service["service_ownerId"]);
    const vehicle = await findVehicleById(service["vehicleId"]);
    const itemList = await listServiceItemByServiceId({serviceId: service["id"]});
    return {
      uuid: service["uuid"],
      serviceType: service["service_type"],
      cost: service["cost"],
      rate: service["rate"],
      description: service["owner_complain"],
      status: service["service_status"],
      datePosted: service["trans_date"],
      dateCreated: service["createdAt"],
      itemList: this.listItem(itemList),
      serviceProvider: this.getPartialUser(serviceProvider),
      serviceOwner: this.getPartialUser(serviceOwner),
      vehicle: this.getPartialVehicle(vehicle),
    };
  },

  async getSingleServiceLog(service) {
    const postedBy = await findUserById(service["postedById"]);
    return {
      uuid: service["uuid"],
      description: service["Comment"],
      category: service["category"],
      dateCreated: service["createdAt"],
      postedBy: this.getPartialUser(postedBy),
    };
  },
  async listService(serviceList) {
    const serviceResponse = [];
    if (serviceList) {
      for (let user of serviceList) {
        const realUser = await this.getSingleService(user);
        serviceResponse.push(realUser);
      }
    }
    return serviceResponse;
  },

  async listServiceConversation(serviceList) {
    const serviceResponse = [];
    if (serviceList) {
      for (let result of serviceList) {
        serviceResponse.push(await this.getSingleServiceLog(result));
      }
    }
    return serviceResponse;
  },

  async getSingleServiceItem(service) {
    return {
      uuid: service["uuid"],
      itemName: service["itemName"],
      qty: service["qty"],
      salePrice: service["salePrice"],
      amount: service["amount"],
      dateCreated: service["createdAt"],
    };
  },

  async listServiceItem(itemList) {
    const serviceResponse = [];
    if (itemList) {
      for (let result of itemList) {
        serviceResponse.push(await this.getSingleServiceItem(result));
      }
    }
    return serviceResponse;
  },
};
module.exports.Mapper = Mapper;
