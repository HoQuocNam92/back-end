const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserModel = require("../model/user.model");
class AuthService {
  static async refreshToken(token) {
    const decoded = jwt.verify(token , process.env.REFRESH_TOKEN);
    
    const user = await UserModel.findID(decoded.userId);
    if(!user) {
      throw new Error ("User not Found");
    }
    console.log("Neu goi refresToken hien cai nay len")

    const newAccessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" },
    );


    return { accessToken: newAccessToken, user };
  }
  static async register(user) {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await userModel.register(user);
    return newUser;
  }

  static async login(credentials) {
    const user = await userModel.findOne(credentials.email);
    
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" },
    );

    const refreshToken  =  jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" },
    ) 
   

    return { user, accessToken, refreshToken };
  }
  static async FindOne(email) {
    const user = await userModel.findOne(email);
    return user;
  }
  static async forgotPassword(user) {
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" },
    );
    const resetLink = `http://localhost:5173/api/auth/resetlink/${token}`;
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hoquocnam92@gmail.com",
        pass: "ieta kjrm mtyj oczk",
      },
    });
    await transport.sendMail({
      to: user.email,
      subject: "Reset password",
      html: `<p>Click <a href="${resetLink}">here</a>to reset your password</p>`,
    });
  }
  static async updatePassword(userId, newPassword) {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const user = await userModel.updatePassword(userId, hashPassword);
    return user;
  }
  static async loginGmail (data) {
    return await userModel.loginGmail(data);  
  }
}

module.exports = AuthService;
