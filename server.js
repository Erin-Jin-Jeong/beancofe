// require("dotenv").config(); // PHẢI ĐẶT TRÊN CÙNG


// const app = require("./src/app");

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// const express = require("express");
// const app = express();
// // require("dotenv").config();

// /* ✅ PHẢI CÓ */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // routes
// app.use("/api/auth", require("./src/routes/auth.routes"));
// app.use("/api/products", require("./src/routes/product.routes"));
// app.use("/api/cart", require("./src/routes/cart.routes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );


// require("dotenv").config(); // PHẢI ĐỂ TRÊN CÙNG

// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// /* middleware */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* 🔥 CONNECT MONGODB */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// /* routes */
// app.use("/api/auth", require("./src/routes/auth.routes"));
// app.use("/api/products", require("./src/routes/product.routes"));
// app.use("/api/cart", require("./src/routes/cart.routes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
require("dotenv").config(); // 🔥 PHẢI ĐỂ TRÊN CÙNG

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =======================
   🔹 GLOBAL MIDDLEWARE
======================= */
app.use(
  cors({
    origin: "http://localhost:5173", // frontend Vite
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   🔹 ROUTES
======================= */
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/products", require("./src/routes/product.routes"));
app.use("/api/cart", require("./src/routes/cart.routes"));
app.use("/api/orders", require("./src/routes/order.routes"));

/* =======================
   🔹 404 HANDLER
======================= */
app.use((req, res) => {
  res.status(404).json({
    message: "API not found",
    path: req.originalUrl,
  });
});

/* =======================
   🔹 ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

/* =======================
   🔹 START SERVER
======================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });