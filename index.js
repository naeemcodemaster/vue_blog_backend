require("dotenv").config({
  path: "./.env",
});
const express = require("express");
const { Authentication } = require("./routes");
const { ConnectDB } = require("./config/db");
const morgan = require("morgan");
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require("./middlewares/error");
const httpStatus = require("http-status");

const app = express();
const path = require("path");

// Middlewares
const cors = require("cors");
app.use("/static", express.static(path.join(__dirname, "./uploads/")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;
ConnectDB();

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/api/v1", Authentication);

// Util files included here for api error catch
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});
app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Sever running or port ${port}`);
});
