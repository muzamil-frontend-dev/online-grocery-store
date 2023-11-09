import dotenv from "dotenv";
import colors from "colors";
import express from "express";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    colors.bgCyan(
      `Application is running in ${process.env.NODE_MODE} mode at port ${port}`
    )
  );
});
