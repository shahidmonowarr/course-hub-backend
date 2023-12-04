// imports
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/configs/databaseConfigs.js";
import userRoutes from "./src/routes/AuthRoute.js";
import productRoute from "./src/routes/ProductsRoutes.js";
import feedbackRoute from "./src/routes/UserFeedaBackRoutes.js";
// Application
const app = express();
dotenv.config();
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// users routes
app.use("/api/v1/auth/", userRoutes);
app.use("/api/v1/product/", productRoute);
app.use("/api/v1/feedback/", feedbackRoute);

// Routes
app.get("/", (req, res) => {
  return res.send("Server Running...!!");
});

// Handle Not valid routes
app.use("*", (req, res) => {
  return res.status(404).send("Invalid Route!!");
});

// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
