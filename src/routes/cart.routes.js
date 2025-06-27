const router = require("express").Router();
const CartController = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middleware");
router.post("/", auth, CartController.AddCart);
router.get("/", auth, CartController.GetCart);
router.delete("/:id", auth, CartController.DeleteCart);
module.exports = router;
