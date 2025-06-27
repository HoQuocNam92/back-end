const UserModel = require("../model/user.model")
class UserService {
    static async updateProfile (props){
        return await UserModel.updateProfile(props);
    }
    static async getProfile (id) {
        return await UserModel.getProfile(id);
    }
}

module.exports = UserService;