const userModel = require ('../models/user.model')

class BdsessionManager {
   
  getSession = async (email, password) => {
    return await userModel.findOne({email, password});
  }

  getEmail = async (email) => {
       return await userModel.findOne(email);
  }
 
  createSession = async (user)=>{
      const { firstName,lastName, email, password,rol} = user
      return await userModel.create({firstName , lastName, email, password, rol })
  }
  UserSession = async (id)=>{
     return await userModel.findById(id)
}

}
 
module.exports = new BdsessionManager