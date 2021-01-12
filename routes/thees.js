const mongoose = require('mongoose');
const express = require('express');
const {soortSchema} = require('./soorten');
const {Soort} = require('./soorten');
const { generateKeyPair } = require('crypto');
const router = express.Router();

const Thee = mongoose.model('Thees', new mongoose.Schema({
    naam: {
        type:String,
        required: true,
        trim: true,
        maxlength: 50
    },
    soort: {
        type: soortSchema,
        required: true
    },
    smaak: [ String ],
    date: { type: Date, default: Date.now},
    isBeschikbaar: {
        type: Boolean,
        default: false
    }
})); 

router.get("/", async (req,res) => {
    const thees = await Thee.find().sort('naam');
  res.send(thees);  
});

router.post('/', async (req,res) => {

    const soort = await Soort.findById(req.body.id);
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