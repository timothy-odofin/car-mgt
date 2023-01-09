const {
  findVehicleById,
  findUserById,
  listServiceItemByServiceId,
  listVehiclePostedById,
} = require("../controllers/search");

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
      amount: user["amount"],
    };
  },
  listItem(itemList) {
    const userResponse = [];
    let total = 0;
    if (itemList) {
      itemList.forEach((item) => {
        userResponse.push(this.getSingleServiceItem(item));
        total += item["amount"];
      });
    }
    return { data: userResponse, totalCost: total };
  },
  async getSingleService(service) {
    const serviceProvider = await findUserById(service["service_provideId"]);
    const serviceOwner = await findUserById(service["service_ownerId"]);
    const vehicle = await findVehicleById(service["vehicleId"]);
    const itemList = await listServiceItemByServiceId({
      serviceId: service["id"],
    });
    const item = this.listItem(itemList);
    return {
      uuid: service["uuid"],
      serviceType: service["service_type"],
      cost: item["totalCost"],
      rate: service["rate"],
      description: service["owner_complain"],
      status: service["service_status"],
      datePosted: service["trans_date"],
      dateCreated: service["createdAt"],
      itemList: item["data"],
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
  async listCar(carList) {
    const carItems = [];
    if (carList) {
      for (let vehicle of carList) {
        const realUser = await this.getFullVehicle(vehicle);
        carItems.push(realUser);
      }
    }
    return carItems;
  },
  async getFullVehicle(user) {
    const owner = await findUserById(user["ownerId"]);
    return {
      uuid: user["uuid"],
      vehicleNumber: user["vehicleNumber"],
      company: user["company"],
      regNumber: user["regNumber"],
      color: user["color"],
      model: user["model"],
      image: user["image"],
      owner: this.getPartialUser(owner),
      status: user["status"],
      createdAt: user["createdAt"],
    };
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

  async getSingleProduct(product) {
    const postedBy = await findUserById(product["postedById"]);
    return {
      uuid: product["uuid"],
      name: product["name"],
      description: product["description"],
      quality: product["avaliable_quatity"],
      price: product["unit_price"],
      dateCreated: product["createdAt"],
      postedBy: this.getPartialUser(postedBy),
    };
  },

  async listProduct(product) {
    const productResponse = [];
    if (product) {
      for (let result of product) {
        productResponse.push(await this.getSingleProduct(result));
      }
    }
    return productResponse;
  },
};
module.exports.Mapper = Mapper;
