// controllers/scholarshipController.js
const { error } = require("console");
const db = require("../config/db");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

exports.registerScholarshipStudent = async (req, res) => {
  try {
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

    

   


    // 1. Check existing student
    const [existing] = await db.query(
      "SELECT id FROM forte_student WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Student already registered" });
    }

    const options = {
      amount: 1 * 100, // ₹1
      currency: "INR",
      receipt: `scholarship_${Date.now()}`
    };

    // 2. Create Razorpay Order
    const order = await razorpay.orders.create(options);
    

    // 3. Insert student with PENDING payment
    await db.query(
      `INSERT INTO forte_student
      (student_name, email, phone_number, class, course, parent_name,
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
        1,
        "PENDING"
      ]
    );

    res.status(201).json({
      message: "Registration successful. Proceed to payment",
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
