// controllers/scholarshipController.js
const { error } = require("console");
const db = require("../config/db");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

exports.registerScholarshipStudent = async (req, res) => {
  try {
    console.log("===== Scholarship Registration API Called =====");
    console.log("Incoming Body:", req.body);

    const {
      studentName,
      email,
      phone,
      class: studentClass,
      course,
      parentName,
      address,
      city,
      state,
      pincode
    } = req.body;

    // 🔹 Basic validation
    if (!studentName || !email || !phone || !studentClass || !course) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    // 🔹 Check existing student
    const [existing] = await db.query(
      "SELECT * FROM forte_student WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      const student = existing[0];

      if (student.payment_status === "SUCCESS") {
        return res.status(400).json({
          message: "Student already registered and payment completed"
        });
      }

      // If payment pending → reuse existing order
      return res.status(200).json({
        message: "Payment pending. Continue payment.",
        order: {
          id: student.razorpay_order_id,
          amount: student.payment_amount * 100,
          currency: "INR"
        }
      });
    }

    // 🔹 Create Razorpay order
    const options = {
      amount: 499 * 100, // ₹499
      currency: "INR",
      receipt: `scholarship_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // 🔹 Insert into DB with PENDING status
    await db.query(
      `INSERT INTO forte_student
      (student_name, email, phone_number, \`class\`, course, parent_name,
       address, city, state, pincode,
       razorpay_order_id, payment_amount, payment_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentName,
        email,
        phone,
        studentClass,
        course,
        parentName,
        address,
        city,
        state,
        pincode,
        order.id,
        499,
        "PENDING"
      ]
    );

    res.status(201).json({
      message: "Registration created. Proceed to payment.",
      order
    });

  } catch (error) {
    console.error("❌ Create Order Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};



exports.verifyScholarshipPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Update payment status
    await db.query(
      `UPDATE forte_student
       SET razorpay_payment_id = ?,
           razorpay_signature = ?,
           payment_status = 'SUCCESS',
           payment_date = NOW()
       WHERE razorpay_order_id = ?`,
      [razorpay_payment_id, razorpay_signature, razorpay_order_id]
    );

    res.json({ message: "Payment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllScholarshipStudents = async (req, res) => {
  try {
    const [students] = await db.query(
      "SELECT * FROM forte_student ORDER BY created_at DESC"
    );

    res.status(200).json({
      count: students.length,
      students
    });

  } catch (error) {
    console.error("❌ Get All Students Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


exports.getScholarshipStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const [student] = await db.query(
      "SELECT * FROM forte_student WHERE id = ?",
      [id]
    );

    if (student.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student[0]);

  } catch (error) {
    console.error("❌ Get Student Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


exports.updateScholarshipStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      studentName,
      phone,
      class: studentClass,
      course,
      parentName,
      address,
      city,
      state,
      pincode
    } = req.body;

    const [existing] = await db.query(
      "SELECT * FROM forte_student WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    await db.query(
      `UPDATE forte_student
       SET student_name = ?,
           phone_number = ?,
           \`class\` = ?,
           course = ?,
           parent_name = ?,
           address = ?,
           city = ?,
           state = ?,
           pincode = ?
       WHERE id = ?`,
      [
        studentName,
        phone,
        studentClass,
        course,
        parentName,
        address,
        city,
        state,
        pincode,
        id
      ]
    );

    res.status(200).json({
      message: "Student updated successfully"
    });

  } catch (error) {
    console.error("❌ Update Student Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


exports.deleteScholarshipStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query(
      "SELECT * FROM forte_student WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    await db.query(
      "DELETE FROM forte_student WHERE id = ?",
      [id]
    );

    res.status(200).json({
      message: "Student deleted successfully"
    });

  } catch (error) {
    console.error("❌ Delete Student Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
