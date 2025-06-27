const AuthService = require("../services/auth.service");

const jwt = require("jsonwebtoken")
const AuthController = {
  refreshToken: async (req, res) => {
    try {
      const token = req.cookies.refreshToken;
      if (!token) return res.sendStatus(401);
      const { accessToken, user } = await AuthService.refreshToken(token);
      res.json({ accessToken, user });
    } catch (err) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
  },

  register: async (req, res) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: "User created", user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { accessToken, user, refreshToken } = await AuthService.login(req.body);

      if (!user) {
        return res.json({ message: "Not found user ", user: user });
      }
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      res.json({ accessToken, user });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await AuthService.FindOne(email);
      if (!user) return res.status(400).send("User not found");
      await AuthService.forgotPassword(user);
      res.json("Reset link sent");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { userId } = req.user;
      const { newPassword } = req.body;
      await AuthService.updatePassword(userId, newPassword);
      res.status(201).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  loginCallback: async (req, res) => {
    try {
      const user = req.user;
      const accessToken = jwt.sign(
        { userid: user.id, email: user.email },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1h" }
      );
      const redirectUrl = `${process.env.CLIENT_URL}/google-auth?token=${accessToken}&user=${encodeURIComponent(JSON.stringify(user))}`;
      res.redirect(redirectUrl);

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

module.exports = AuthController;
