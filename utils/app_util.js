const {User} = require('../models/index');

async function findUser(param){
   return await User.findOne({where:{uuid: param}})
}
const UserConverter =  {
     find(uuid){
        return  findUser((uuid))
    },
    list(userList){
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
    }

}
module.exports.UserConverter =UserConverter;
