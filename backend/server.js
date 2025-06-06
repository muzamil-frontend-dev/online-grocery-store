import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import adminRoutes from "./routes/admin.js";
import ConnectDb from "./config/db.js";
import path from "path";

dotenv.config();

ConnectDb();

const app = express();

app.use(morgan("common"));

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/promotions/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

const __dir = path.resolve();

app.use("/uploads", express.static(path.join(__dir, "uploads")));

if (process.env.NODE_MODE === "production") {
  app.use("/", express.static(path.join(__dir, "frontend", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dir, "frontend", "build", "index.html"));
  });
}

app.use(errorHandler);
app.use("/api/products", productRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Application is running in ${process.env.NODE_MODE} mode at port ${port}.`
      .bgCyan
  );
});
