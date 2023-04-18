const {
  findVehicleById,
  findUserById,
  listServiceItemByServiceId,
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
  getRatingScore(user) {
    console.log(user);
    const ratings = user["ratings"];
    if (ratings) {
      let totalScore = 0;
      for (const rating of ratings) {
        totalScore += rating["score"];
      }
      return totalScore / ratings.length;
    }
    return 0;
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
      aboutUS: user["aboutUs"],
      yearExp: user["yearExp"],
      rating: this.getRatingScore(user),
      address: user["address"] === null ? "NA" : user["address"],
    };
  },
  retrieveSingleUser(user) {
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
      aboutUS: user["aboutUs"],
      photo: user["photograph"],
      yearExp: user["yearExp"],
      rating: this.getRatingScore(user),
      address: user["address"] === null ? "NA" : user["address"],
    };
  },
  getPartialUser(user) {
    if (user) {
      return {
        uuid: user["uuid"],
        firstName: user["firstName"],
        lastName: user["lastName"],
        phone: user["phone"],
      };
    } else {
      return {};
    }
  },
  getPartialVehicle(user) {
    if (user) {
      return {
        uuid: user["uuid"],
        vehicleNumber: user["vehicleNumber"],
        company: user["company"],
      };
    } else {
      return {};
    }
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
    if (user) {
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
    } else {
      return {};
    }
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

  async listProduct(productList) {
    const productItem = [];
    if (productList) {
      for (let product of productList) {
        const realProduct = await this.getSingleProduct(product);
        productItem.push(realProduct);
      }
    }
    return productItem;
  },

  async getSingleInsurance(insurance) {
    if (insurance) {
      return {
        uuid: insurance["uuid"],
        classOfInsurance: insurance["classOfInsurance"],
        coverType: insurance["coverType"],
        vehicleUse: insurance["vehicleUse"],
      };
    } else {
      return {};
    }
  },

  async listInsurance(insuranceList) {
    const insuranceItem = [];
    if (insuranceList) {
      for (let insurance of insuranceList) {
        const realInsurance = await this.getSingleInsurance(insurance);
        insuranceItem.push(realInsurance);
      }
    }
    return insuranceItem;
  },

  async getSingleInsuranceCompany(insurance) {
    if (insurance) {
      return {
        uuid: insurance["uuid"],
        name: insurance["name"],
        logo: insurance["logo"],
        website: insurance["website"],
      };
    } else {
      return {};
    }
  },

  async listInsuranceCompany(insuranceList) {
    const insuranceItem = [];
    if (insuranceList) {
      for (let insurance of insuranceList) {
        const realInsurance = await this.getSingleInsuranceCompany(insurance);
        insuranceItem.push(realInsurance);
      }
    }
    return insuranceItem;
  },

  async listPolicyDetail(PolicyDetailList) {
    const PolicyItems = [];
    if (PolicyDetailList) {
      for (let PolicyDetail of PolicyDetailList) {
        const realPolicy = await this.getPolicyDetail(PolicyDetail);
        PolicyItems.push(realPolicy);
      }
    }
    return PolicyItems;
  },
  async getPolicyDetail(policy) {
    if (policy) {
      const owner = await findUserById(policy["ownerId"]);
      const vehicle = await findVehicleById(policy["vehicleId"]);
      return {
        uuid: policy["uuid"],
        policyHoldler: policy["policyHoldler"],
        companyName: policy["companyName"],
        nin: policy["nin"],
        issueDate: policy["issueDate"],
        state: policy["state"],
        lga: policy["lga"],
        address: policy["address"],
        owner: this.getPartialUsers(owner),
        vehicle: this.getPartialVehicle(vehicle),
        dateCreated: policy["createdAt"],
      };
    } else {
      return {};
    }
  },

  getPartialUsers(user) {
    if (user) {
      return {
        uuid: user["uuid"],
        firstName: user["firstName"],
        lastName: user["lastName"],
        phone: user["phone"],
        email: user["email"],
      };
    } else {
      return {};
    }
  },
};
module.exports.Mapper = Mapper;
