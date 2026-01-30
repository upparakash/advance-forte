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
    console.log("⛔ Admin signup blocked");
    return res.status(403).json({ message: "Admin signup not allowed" });
  }

  try {
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed");

    const sql = `
      INSERT INTO advanceforteusers 
      (name, email, phone, password, role) 
      VALUES (?, ?, ?, ?, ?)
    `;

    console.log("📝 Executing SQL query...");
    console.log("📦 Values:", [name, email, phone, hashedPassword, role]);

    db.query(
      sql,
      [name, email, phone, hashedPassword, role],
      (err, result) => {
        if (err) {
          console.error("❌ DB Error:", err);

          if (err.code === "ER_DUP_ENTRY") {
            console.warn("⚠️ Duplicate phone detected");
            return res
              .status(409)
              .json({ message: "Phone number already registered" });
          }

          return res.status(500).json({ message: err.message });
        }

        console.log("✅ User inserted successfully:", result.insertId);
        res.json({ message: "User registered successfully ✅" });
      }
    );
  } catch (error) {
    console.error("🔥 Signup exception:", error);
    res.status(500).json({ message: "Signup failed ❌" });
  }
});

/**
 * ✅ Login (All roles)
 */
router.post("/login", (req, res) => {
  console.log("📥 Login API called");
  console.log("👉 Request body:", req.body);

  const { phone, password, role } = req.body;

  const sql = `
    SELECT * FROM advanceforteusers 
    WHERE phone = ? AND role = ?
  `;

  console.log("📝 Running SELECT query...", [phone, role]);

  db.query(sql, [phone, role], async (err, results) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({ message: err.message });
    }

    console.log("📊 Query results:", results);

    if (results.length === 0) {
      console.warn("⚠️ User not found");
      return res.status(401).json({ message: "User not found ❌" });
    }

    const user = results[0];

    console.log("🔐 Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.warn("⚠️ Password mismatch");
      return res.status(401).json({ message: "Invalid password ❌" });
    }

    console.log("✅ Password matched");

    console.log("🔑 Generating JWT token...");
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Token generated");

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  });
});

/**
 * ✅ Protected Profile API
 */
router.get("/profile", authMiddleware, (req, res) => {
  console.log("🔐 Profile API accessed");
  console.log("👤 Auth user:", req.user);

  res.json({
    message: "Protected profile data 🔐",
    user: req.user,
  });
});

module.exports = router;
