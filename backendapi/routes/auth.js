const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

console.log("✅ Auth routes loaded");

/**
 * ✅ Signup (Student & Teacher only)
 */
router.post("/signup", async (req, res) => {
  console.log("📥 Signup API called");
  console.log("👉 Request body:", req.body);

  const { name, email, phone, password, role } = req.body;

  if (role === "admin") {
    return res.status(403).json({ message: "Admin signup not allowed" });
  }
// if (role === "admin" && process.env.ALLOW_ADMIN !== "true") {
//   return res.status(403).json({ message: "Admin signup not allowed" });
// }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO advanceforteusers 
      (name, email, phone, password, role) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      name,
      email,
      phone,
      hashedPassword,
      role,
    ]);

    console.log("✅ User inserted:", result.insertId);
    res.json({ message: "User registered successfully ✅" });

  } catch (err) {
    console.error("❌ Signup error:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Phone number already registered" });
    }

    res.status(500).json({ message: "Signup failed ❌" });
  }
});

/**
 * ✅ Login (All roles)
 */
router.post("/login", async (req, res) => {
  console.log("📥 Login API called");
  console.log("👉 Request body:", req.body);

  const { phone, password, role } = req.body;

  try {
    console.time("DB_QUERY");

    const [results] = await db.query(
      `SELECT * FROM advanceforteusers WHERE phone = ? AND role = ?`,
      [phone, role]
    );

    console.timeEnd("DB_QUERY");
    console.log("📊 Query results:", results);

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found ❌" });
    }

    const user = results[0];

    console.time("BCRYPT");
    const isMatch = await bcrypt.compare(password, user.password);
    console.timeEnd("BCRYPT");

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password ❌" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret missing" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Login successful");

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Login failed ❌" });
  }
});

/**
 * ✅ Protected Profile
 */
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile data 🔐",
    user: req.user,
  });
});

module.exports = router;
