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
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

// Logging the environment variables immediately after dotenv.config
if (!process.env.MONGO_URI) {
  console.error(
    "Error: MONGODB_URI is not defined. Please check your .env file."
  );
  process.exit(1);
}

console.log("MongoDB URI:", process.env.MONGO_URI);
console.log("Server Port:", port);

// Middleware setup
app.use("/static", express.static(path.join(__dirname, "./uploads/")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Database connection
ConnectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the application if the database connection fails
  });

// Basic route
app.get("/", (req, res) => {
  res.send("Hi");
});

// API routes
app.use("/api/v1", Authentication);

// Error handling for not found routes
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

// Error converters and handlers
app.use(errorConverter);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
