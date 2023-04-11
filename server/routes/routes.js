const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const user = await User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/forget-password", async (req, res) => {
  try {
    const user = await User.find({email:req.body.email});

    if (!user) {
      console.log('user not found')
      res.status(400).send("user not Found");
    }
    const JWT_SECRET = "somesupersecret";
    const secret = JWT_SECRET + user[0].password;

    const payload = {
      email: user[0].email,
      id: user[0]._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "60m" });

    const link = `http://localhost:4200/reset-password/${user[0]._id}/${token}`;

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "elisa.nader@ethereal.email",
        pass: "zPth1HKbeJSfJpVSWb",
      },
    });

    let info = await transporter.sendMail({
      from: '"khyati" <elisa.nader@ethereal.email>',
      to: user[0].email,
      subject: "Reset- password link",
      text: link,
      html: `<a href=${link}>click here</a>`,
    });

    res.send(info)
  } catch (error) {
    res.status(500).send("server down");
  }
});

router.get("/reset-password/:id/:token", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).send("user not found");
    }

    const JWT_SECRET = "somesupersecret";
    const secret = JWT_SECRET + user.password;

    const payload = jwt.verify(req.params.token, secret);
    res.send(payload);
  } catch (error) {
    res.status(500).send("server not found");
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      res.status(400).send("user not found");
    }
    
    user.password = req.body.password;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send("server down");
  }
});

module.exports = router;
