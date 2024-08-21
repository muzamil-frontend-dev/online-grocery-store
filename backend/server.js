import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import connectDb from "./config/db.js";
import morgan from "morgan";

dotenv.config();

connectDb();

const app = express();
// Using for logging purpose
app.use(morgan("common")); // also changed it to other formats like "dev", "tiny", "combined" etc.

app.use(express.json()); // Converts incomming requests JSON payload to JavaScript object.

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    colors.bgCyan(
      `Application is running in ${process.env.NODE_MODE} mode at port ${port}`
    )
  );
});
