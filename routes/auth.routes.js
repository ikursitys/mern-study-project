const { Router } = require("express");
const bcrypt = require("bcryptjs");
const router = Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Wrong email").isEmail(),
    check("password", "Email length must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log("Body:", req.body);
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Wrong registration data",
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "The user already exists!" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({ message: "The user has been created" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong... Please, try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter the correct email").normalizeEmail().isEmail(),
    check("password", "Enter the password").exists(),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Wrong authorization data",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "The user has not been found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password, try again" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong... Please, try again" });
    }
  }
);

module.exports = router;
