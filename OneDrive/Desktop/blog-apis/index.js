const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./Database/db");
const { connectRedis } = require("./config/redisClient");
const apiLimiter = require("./middleware/rateLimiter");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const addressRoutes = require("./routes/addressRoutes");
const profileRoutes = require("./routes/profileRoutes");

dotenv.config();

const app = express();


// ✅ MIDDLEWARES (VERY IMPORTANT)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 🔥 FIX FOR FORM-DATA


// ✅ RATE LIMIT
app.use("/api", apiLimiter);


// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});


// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // 🔥 YOUR CURRENT STRUCTURE
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/profile", profileRoutes);


// ✅ 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


const PORT = process.env.PORT || 3000;


// ✅ START SERVER
const startServer = async () => {
  try {
    await connectDB();

    // Don't block server if Redis fails
    connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server start error:", error.message);
    process.exit(1);
  }
};

startServer();