const router = require("express").Router();
const auth = require("../middlewares/auth.middleware")
const UserController = require("../controllers/user.controller");
 
router.post("/updateProfile",auth , UserController.updateProfile);
router.get("/",auth , UserController.getProfile);
module.exports = router;
