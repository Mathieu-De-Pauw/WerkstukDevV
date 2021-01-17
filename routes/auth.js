const _ = require("lodash");
const bcrypt = require("bcrypt");
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Post
router.post("/", async (req,res) => {
    let user =await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");

    const validWachtwoord = await bcrypt.compare(req.body.wachtwoord, user.wachtwoord);
    if(!validWachtwoord) return res.status(400).send("Invalid email or password");

    res.send(true);
});



module.exports = router;

