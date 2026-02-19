const express = require("express");
const router = express.Router();
const { registerScholarshipStudent, verifyScholarshipPayment, getAllScholarshipStudents, getScholarshipStudentById, updateScholarshipStudent, deleteScholarshipStudent } = require("../controllers/scholarshipController");

router.post("/create-order", registerScholarshipStudent);
router.post("/verify-payment", verifyScholarshipPayment);
// Get All
router.get("/", getAllScholarshipStudents);

// Get By ID
router.get("/:id", getScholarshipStudentById);

// Update
router.put("/:id", updateScholarshipStudent);

// Delete
router.delete("/:id", deleteScholarshipStudent);


module.exports = router;