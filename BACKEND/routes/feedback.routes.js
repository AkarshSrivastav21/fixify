const express = require("express");
const { submitFeedback, getAllFeedback } = require("../controllers/feedback.controller");
const { authUser } = require("../middleware/auth.middleware");
const { authAdmin } = require("../middleware/admin.middleware");

const router = express.Router();

router.post("/submit", authUser, submitFeedback);
router.get("/all", getAllFeedback);

module.exports = router;