const express = require("express");
const app = express();
const entranceRoute = require("./routes/entrance_route");
const settingRoute = require("./routes/setting_route");
const userRoute = require("./routes/users_route");
const productRoute = require("./routes/product_route");
const vehicleRoute = require("./routes/vehicle_route");
const insuranceRoute = require("./routes/insurance_route");
const serviceRoute = require("./routes/service_route");
const verified = require("./verifyToken");
const { sequelize } = require("./models/index");
const notFound = require("./middleware/not-found");
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json());

//Routes Documentation
app.use("/setting", settingRoute);
app.use("/entrance", entranceRoute);
app.use("/user", userRoute);
// app.use("/user", verified, userRoute);
<<<<<<< HEAD
app.use("/product", productRoute);
app.use("/vehicle", verified, vehicleRoute);
=======
app.use("/product", verified, productRoute);
app.use("/vehicle",  vehicleRoute);
>>>>>>> 31cb4a4ead686a017f47caa9864bb6f978848973
app.use("/insurance", verified, insuranceRoute);
app.use("/service", serviceRoute);
// CORS POLICY
app.use(cors());

app.use(notFound);

// app.use(errorHandlerMiddrware);
const PORT = process.env.PORT || 4000;
sequelize
  .authenticate()
  .then(() => {
    console.log("Databased Connected!!");
    app.listen({ port: PORT }, async () => {
      console.log("Server up on http://localhost", PORT);
    });
  })
  .catch((error) => console.log(error));
