import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import ConnectDb from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import productRoutes from "./routes/products.js";

dotenv.config();

ConnectDb();

const app = express();

app.use(morgan("common"));

app.use(express.json());

app.use("/api/products", productRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Application is running in ${process.env.NODE_MODE} mode at port ${port},`
      .bgCyan
  );
});
