const router = require("express").Router();
const AuthoController = require("../controllers/auth.controller");
const passport = require("passport");


const Reset = require("../middlewares/reset.middleware");
router.post("/register", AuthoController.register);
router.post("/refresh-token", AuthoController.refreshToken);
router.post("/login", AuthoController.login);
router.post("/forgot-password", AuthoController.forgotPassword);
router.post("/resetlink/:token", Reset, AuthoController.resetPassword);
router.get("/google",  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  }));
router.get(
    "/google/callback",
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/api/auth/login"
    }),
    AuthoController.loginCallback
  );

module.exports = router;
