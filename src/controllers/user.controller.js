const UserSevice = require("../services/user.service");
 


const UserController = {
  updateProfile :async(req,res)=>{
    try {
      const id= req.user.userid
      const props = req.body;
      props.id = id;
      const user  = await UserSevice.updateProfile(props);
      res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:"Error during update"})
    }

  },
  getProfile:async(req,res)=>{
    try {
      const id = req.user.userid
      console.log("Check id" , id);
      const user  = await UserSevice.getProfile(id);
      res.status(200).json(user);
      
    } catch (error) {
      res.status(500).json({message:"Error during get Profile"})
      
    }
  }
}

module.exports = UserController;