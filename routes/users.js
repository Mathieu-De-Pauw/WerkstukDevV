const _ = require("lodash");
const bcrypt = require("bcrypt");
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Post
router.post("/", async (req,res) => {
    let user =await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("Dit email adres heeft al een account, gelieve in te loggen met je wachtwoord");

    user = new User({
        naam: req.body.naam,
        email: req.body.email,
        wachtwoord: req.body.wachtwoord
    });
    const salt = await bcrypt.genSalt(10);
    user.wachtwoord = await bcrypt.hash(user.wachtwoord,salt);

    await user.save();

    res.send(_.pick(user,['naam','email']));
});

module.exports = router;

