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



// controllers/scholarshipController.js 

exports.getScholarshipReceipt = async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    console.log("Fetching receipt for transaction ID:", transactionId); // Debug log

    // Validate transaction ID
    if (!transactionId || transactionId.length < 5) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid transaction ID" 
      });
    }

    // Query to get student details - using existing fields only
    const [studentData] = await db.query(
      `SELECT 
        id,
        student_name,
        email,
        phone_number,
        class,
        course,
        parent_name,
        address,
        city,
        state,
        pincode,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        payment_amount,
        payment_status,
        payment_date,
        created_at as registration_date
      FROM forte_student
      WHERE razorpay_order_id = ? 
         OR razorpay_payment_id = ?
         OR (payment_status = 'SUCCESS' AND id IN (
            SELECT id FROM forte_student WHERE razorpay_order_id = ? OR razorpay_payment_id = ?
         ))`,
      [transactionId, transactionId, transactionId, transactionId]
    );

    console.log("Query result:", studentData); // Debug log

    if (studentData.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No receipt found for the provided transaction ID" 
      });
    }

    const student = studentData[0];

    // Check if payment is successful
    if (student.payment_status !== 'SUCCESS') {
      return res.status(400).json({ 
        success: false,
        message: "Payment not completed for this transaction. Current status: " + student.payment_status 
      });
    }

    // Generate receipt number dynamically (without storing in DB)
    const year = new Date(student.payment_date || student.registration_date).getFullYear();
    const receiptNumber = `AF-RCPT-${year}-${String(student.id).padStart(6, '0')}`;
    
    // Generate roll number dynamically (without storing in DB)
    const rollNumber = `AFST-${String(student.id).padStart(4, '0')}`;
    
    // Generate student ID dynamically
    const studentId = `STU-${String(student.id).padStart(6, '0')}`;

    // Format payment date
    const paymentDate = student.payment_date 
      ? new Date(student.payment_date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

    // Format registration date
    const registrationDate = student.registration_date
      ? new Date(student.registration_date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : paymentDate;

    // Determine academic session based on registration date
    const regYear = new Date(student.registration_date).getFullYear();
    const academicSession = `${regYear} – ${regYear + 1}`;

    // Prepare receipt data using only existing fields
    const receiptData = {
      success: true,
      receipt: {
        // Receipt Info (generated dynamically)
        receiptNumber: receiptNumber,
        receiptDate: paymentDate,
        
        // Student Info (from DB)
        studentName: student.student_name,
        studentId: studentId, // generated dynamically
        parentName: student.parent_name,
        email: student.email,
        phone: student.phone_number,
        address: student.address,
        city: student.city,
        state: student.state,
        pincode: student.pincode,
        
        // Course Info (from DB)
        class: student.class,
        course: student.course,
        academicSession: academicSession, // generated dynamically
        
        // Exam Info (generated dynamically)
        rollNumber: rollNumber,
        
        // Payment Info (from DB)
        paymentAmount: student.payment_amount || 1000, // default to 1000 if not set
        paymentMethod: "UPI / Online", // default since not in DB
        transactionId: student.razorpay_order_id,
        paymentId: student.razorpay_payment_id || "N/A",
        paymentStatus: student.payment_status,
        paymentDate: paymentDate,
        
        // Registration Info (from DB)
        registrationDate: registrationDate
      }
    };

    console.log("Sending receipt data:", receiptData); // Debug log

    res.status(200).json(receiptData);

  } catch (error) {
    console.error("Error fetching receipt:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching receipt",
      error: error.message 
    });
  }
};