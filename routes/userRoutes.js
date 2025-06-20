const express = require("express");
const multer = require("multer");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

// Multer setup for image upload 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


router.post("/register", upload.single("profileImage"), registerUser);

// validates credentials
router.post("/login", loginUser);

module.exports = router;
