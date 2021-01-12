const {Thee} = require('../models/thee')
const {Soort} = require('../models/soort');
const {soortSchema} = require('../models/soort');
const mongoose = require('mongoose');
const express = require('express');
const { generateKeyPair } = require('crypto');
const router = express.Router();

//console.log(soortSchema);

router.get("/", async (req,res) => {
    const thees = await Thee.find().sort('naam');
  res.send(thees);  
});

router.post('/', async (req,res) => {

    const soort = await Soort.findById(req.body.soortId);
    if(!soort) return res.status(400).send("Geen geldige soort thee");

    let thee = new Thee({ 
        naam: req.body.naam,
        soort:{
            _id: soort._id,
            naam: soort.naam
        },
        smaak: req.body.smaak,
        date: req.body.date,
        isBeschikbaar: req.body.isBeschikbaar
    });

    thee = await thee.save();
    res.send(thee);
    });

module.exports = router;