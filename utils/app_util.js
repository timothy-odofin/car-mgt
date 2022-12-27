const {findVehicleById,findUserById} = require('../controllers/search');


function findVehicle(id){
    findVehicleById(id).then(function(row){
        return row;
    }).then(error=>{
        console.log(error)
        return null

    });

}
const Mapper =  {
    listUser(userList){
        const userResponse =[];
        if(userList){
            userList.forEach(user=>{
                userResponse.push(this.getSingleUser(user))
            })
        }
        return userResponse;
    },
    getSingleUser(user){
        return {uuid: user["uuid"],
            accountStatus: user["accountStatus"],
            firstName: user["firstName"],
            lastName: user["lastName"],
            email: user["email"],
            phone: user["phone"],
            category: user["category"],
            serviceList: user["account_type"],
            createdAt : user["createdAt"],
            address: user["address"]}
    },
    getPartialUser(user){
        return {uuid: user["uuid"],
            firstName: user["firstName"],
            lastName: user["lastName"],
            phone: user["phone"]
           }
    },
    getPartialVehicle(user){
        return {uuid: user["uuid"],
            vehicleNumber: user["vehicleNumber"],
            company: user["company"]
           }
    },
    async getSingleService(service){
        const serviceProvider =  await findUserById(service["service_provideId"])
         const serviceOwner = await findUserById(service["service_ownerId"])
         const vehicle = await findVehicleById(service["vehicleId"]);
        return {uuid: service["uuid"],
            serviceType: service["service_type"],
            cost: service["cost"],
            rate: service["rate"],
            description: service["owner_complain"],
            status: service["service_status"],
            datePosted: service["trans_date"],
            dateCreated: service["createdAt"],
            serviceProvider: this.getPartialUser(serviceProvider),
            serviceOwner: this.getPartialUser(serviceOwner),
            vehicle: this.getPartialVehicle(vehicle),
        }
    },

    async getSingleServiceLog(service){
        const postedBy =  await findUserById(service["postedById"])
        return {uuid: service["uuid"],
            description: service["Comment"],
            category: service["category"],
            dateCreated: service["createdAt"],
            postedBy: this.getPartialUser(postedBy),
        }
    },
   async listService(serviceList){
        const serviceResponse =[];
        if(serviceList){
            for(let user of serviceList){
                const realUser = await this.getSingleService(user);
               serviceResponse.push(realUser)
            }

        }
        return serviceResponse;
    },

    async listServiceConversation(serviceList){
        const serviceResponse =[];
        if(serviceList){
            for(let result of serviceList){
                serviceResponse.push(await this.getSingleServiceLog(result))
            }
        }
        return serviceResponse;
    },



}
module.exports.Mapper =Mapper;
