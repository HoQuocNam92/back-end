const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const productRoutes = require("./src/routes/product.routes");
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const adminRoutes = require("./src/routes/admin.routes");
const cartRoutes = require("./src/routes/cart.routes");
const LoginWithGoogle = require("./src/config/Passport");
const vnpayRoutes = require("./src/routes/vnpay.routes");
const passport = require("passport");
var path = require("path");
const app = express();

const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
LoginWithGoogle();
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://front-end-production-108e.up.railway.app",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 3000;
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/order", vnpayRoutes);
app.listen(PORT, () => {
  console.log("http://localhost:8080");
});
