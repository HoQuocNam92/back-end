const router = require("express").Router();
const AdminController = require("../controllers/admin.controller");
const uploadImage = require("../middlewares/upLoad.middleware");
const auth = require("../middlewares/auth.middleware");
const verify = require("../middlewares/role.middleware");
router.get("/users", AdminController.getAllUser);
router.post("/updateusers", AdminController.updateRoleUser);
router.put("/users/:id", auth, verify("admin"), AdminController.editUser);
router.delete("/users/:id", auth, verify("admin"), AdminController.deleteUser);

router.get("/", auth, verify("admin"), AdminController.getAllProduct);
router.post(
  "/products",
  auth,
  verify("admin"),
  uploadImage.single("image"),
  AdminController.createProduct,
);
router.put("/products/:id", auth, verify("admin"), AdminController.eidtProduct);
router.delete(
  "/products/:id",
  auth,
  verify("admin"),
  AdminController.deleteProduct,
);

module.exports = router;
