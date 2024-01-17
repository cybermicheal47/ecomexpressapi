const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRoute = require("./routes/user");
const AuthRoute = require("./routes/auth");
const LoginRoute = require("./routes/login");
const ProductsRoute = require("./routes/product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("DB Sucessfull"))
  .catch((err) => console.log(err));

//endpoint for api
app.get("/api/", () => {
  console.log("test is");
});

app.use(express.json());
//Routes
app.use("/api/user", UserRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/auth", LoginRoute);
app.use("/api/products", ProductsRoute);
app.listen(process.env.PORT || 3500, () => {
  console.log("baqckend");
});
