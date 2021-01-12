const {Soort} = require('../models/soort');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// GET
router.get("/", async (req,res) => {
    const soorten = await Soort.find().sort('naam');
  res.send(soorten);  
});


// POST
router.post('/', async (req,res) => {

let soort = new Soort({ naam: req.body.naam});
soort = await soort.save();
res.send(soort);
});

// PUT
router.put('/:id', async (req,res) => {

    const soort = await Soort.findByIdAndUpdate(req.params.id, {naam: req.body.naam }, {
    new:true
    });

    if(!soort) return res.status(404).send('The course with the given Id was not found');
    res.send(soort);
});

// DELETE 
router.delete('/:id', async (req,res) => {

    const soort = await Soort.findByIdAndDelete(req.params.id);

    if(!soort) return res.status(404).send('The course with the given Id was not found');

    res.send(soort);
});

//GET
router.get('/:id', async (req,res) => {
    const soort = await Soort.findById(req.params.id);
    if(!soort) return res.status(404).send('The course with the given Id was not found');
    res.send(soort);
}); 

module.exports = router;

/* const soorten = [
    {id:1, naam: "Groen"},
    {id:2, naam: "Zwart"},
    {id:3, naam: "Wit"},
    {id:4, naam: "Oolong"},
    {id:5, naam: "Rooibos"},
] */


