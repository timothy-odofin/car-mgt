const {findVehicleById,findUserById} = require('../controllers/search');

 function findUser(param){
     findUserById(param).then(result=>{
         return result;

     }).then(error=>{
         return null

     });

}
function findVehicle(id){
    findVehicleById(id).then(result=>{
        return result;

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
            email: user["email"],
            phone: user["phone"],
           }
    },
    getSingleService(service){
       // const serviceProvider =findUser(service["service_provideId"])
        // const serviceOwner = findUser(service["service_ownerId"])
        // const vehicle = findVehicle(service["vehicleId"]);
        return {uuid: service["uuid"],
            serviceType: service["service_type"],
           // serviceProvider: this.getPartialUser(serviceProvider),
            // serviceOwner: this.getPartialUser(serviceOwner),
            cost: service["cost"],
            rate: service["rate"],
            description: service["owner_complain"],
            status: service["service_status"],
            datePosted: service["trans_date"],
            dateCreated: service["createdAt"]
        }
    },
    listService(serviceList){
        const serviceResponse =[];
        if(serviceList){
            serviceList.forEach(user=>{
                serviceResponse.push(this.getSingleService(user))
            })
        }
        return serviceResponse;
    },



}
module.exports.Mapper =Mapper;
