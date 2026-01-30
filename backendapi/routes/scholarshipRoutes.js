const express = require("express");
const router = express.Router();
const { registerScholarshipStudent, verifyScholarshipPayment } = require("../controllers/scholarshipController");

router.post("/create-order", registerScholarshipStudent);
router.post("/verify-payment", verifyScholarshipPayment);


module.exports = router;