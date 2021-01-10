/*
console.log(module);
const fs = require('fs');
const path = require("path");
*/
//Express
const startUpDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require("morgan");
const app = express();

app.set('view engine','pug');
app.set('views','./views'); //default

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));




///MongoDB connectie 
mongoose.connect('mongodb://localhost/theeshop')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error: ',err));

    //Schema 
    const courseSchema = new mongoose.Schema({
        naam: String,
        kleur: String,
        smaak: [ String ],
        date: { type: Date, default: Date.now},
        IsBeschikbaar: Boolean
    });    

    //Model
    const Thee = mongoose.model('Thee', courseSchema);

    async function createThee(){
        const thee = new Thee ({
            naam: 'White Peony',
            kleur: 'Wit',
            smaak: ['lychee','Pioen'],
            IsBeschikbaar: true
        });
    
    const result = await thee.save();
    console.log(result);
    }

    async function getThee(){
        const thees = await Thee
        .find({IsBeschikbaar:true})
        .limit(10)
        .sort({naam:1})
        .select({naam:1,smaak:1})
        //.count() tel het aantal bestanden in de database
        console.log(thees);
    }
    

    //createThee();
    getThee();




// Server connectie 
app.get('/', (req,res) =>{
    res.send('Running on server');
});
    
    // PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));