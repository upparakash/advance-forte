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
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://www.advanceforte.in"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));


(async () => {
  try {
    const connection = await db.getConnection();
    console.log("MySQL Connected");
    connection.release();
  } catch (err) {
    console.error("MySQL Connection Failed:", err);
  }
})();


app.use("/api/auth", authRoutes);
app.use("/api/scholarship", scholarshipRoutes);
app.use("/api/blogs", blogs);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
