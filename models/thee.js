const mongoose = require('mongoose');
const {soortSchema} = require('./soort');

const Thee = mongoose.model('Thees', new mongoose.Schema({
    naam: {
        type:String,
        required: true,
        trim: true,
        maxlength: 50
    },
    soort: {
        type: soortSchema,
        //type: String,
        required: true
    },
    smaak: [ String ],
    date: { type: Date, default: Date.now},
    isBeschikbaar: {
        type: Boolean,
        default: false
    }
})); 

exports.Thee = Thee;