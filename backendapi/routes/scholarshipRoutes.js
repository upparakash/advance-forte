const express = require("express");
const router = express.Router();
const { registerScholarshipStudent, verifyScholarshipPayment ,getScholarshipReceipt} = require("../controllers/scholarshipController");

router.post("/create-order", registerScholarshipStudent);
router.post("/verify-payment", verifyScholarshipPayment);
router.get('/receipt/:transactionId', getScholarshipReceipt);


module.exports = router;