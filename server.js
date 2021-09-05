const express = require("express");
const glob = require("glob");
const path = require("path");
const colors = require("colors");
const morgan = require("morgan");
var cors = require('cors');
const db = require("./config/db");
const dotenv = require("dotenv");
const farmerRoutes = require("./routes/farmers.routes");
const productRoutes = require("./routes/products.routes");
const programTemplateRoutes = require("./routes/program-templates.routes");
const programRoutes = require("./routes/programs.routes");

dotenv.config({ path: "./config/config.env" });

//Setup Express
const app = express();
app.use(express.json());

//Enable CORS
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/api/farmers", farmerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/program-templates", programTemplateRoutes);
app.use("/api/programs", programRoutes);

//Error handling middleware
app.use(function (err, req, res, next) {
  return res.status(500).json({
    success: false,
    error: "Server Error",
  });
});

//Load Mongoose Schemas
glob.sync("./models/*.model.js").forEach(function (file) {
  require(path.resolve(file));
});

//Connect to MongoDB
db();

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
