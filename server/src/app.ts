import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Inventory Management API",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;