require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require('./config/db.js')

const authRoutes = require("./routes/auth");
const scholarshipRoutes = require('./routes/scholarshipRoutes.js');
const blogs = require("./routes/blog.routes");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://www.advanceforte.in",
      "https://advanceforte.in"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Database connection test (non-blocking)
db.getConnection()
  .then(connection => {
    console.log("✅ MySQL Connected");
    connection.release();
  })
  .catch(err => {
    console.error("⚠️ MySQL Connection Failed (app will continue):", err.message);
  });


app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Advance Forte API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/scholarship", scholarshipRoutes);
app.use("/api/blogs", blogs);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
