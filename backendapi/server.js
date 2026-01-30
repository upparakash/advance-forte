require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require('./config/db.js')

const authRoutes = require("./routes/auth");
const scholarshipRoutes = require('./routes/scholarshipRoutes.js')

const app = express();

app.use(cors());
app.use(express.json());


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

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
