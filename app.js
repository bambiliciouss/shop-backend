const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth");

const products = require("./routes/product");

const errorMiddleware = require("./middlewares/errors");
const order = require("./routes/order");

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
//app.use(fileUpload());

app.use(
  cors({
    origin: "https://mendoza-shop.onrender.com",
    credentials: true,
  })
);

app.use("/api/v1", auth);
app.use("/api/v1", products);
app.use("/api/v1", order);
app.use(errorMiddleware);

module.exports = app;
