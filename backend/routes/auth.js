const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Suryraj@9506";
const fetchuser = require("../middleware/fetchuser");

//Route 1 : Create a user using : POST "/api/auth/createUser".
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email !").isEmail(),
    body("name", "Name must have at least 3 characters !").isLength({ min: 3 }),
    body("password", "Password must have at least 5 characters !").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //Check whether paramters are valid or not.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether user already exist or not.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry, User already exist !" });
      }
      let secPass = await bcrypt.hash(req.body.password, 10);
      //Create user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      res.json({ message: "Registration done !" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error !" });
    }
  }
);

//Route 2 : Login a user using : POST "/api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter a valid email !").isEmail(),
    body("password", "Password should not be empty !").exists(),
  ],
  async (req, res) => {
    //Check whether paramters are valid or not.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether user exist or not.
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ error: "Enter valid credentials !" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Enter valid credentials !" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      res.status(500).json({ error: "Internal server error !" });
    }
  }
);

//Route 3 : Get logged in user details using : POST "api/auth/getUser" .
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error !" });
  }
});

module.exports = router;
