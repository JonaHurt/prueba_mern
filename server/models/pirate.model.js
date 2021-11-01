const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const PirateSchema = new mongoose.Schema({
    nombre: { 
        type: String,
        required: [true, 'El nombre es necesario'],
       
    },
    image: { 
        type: String,
        required: [true, 'El nombre es necesario']
        
    },
    chest: { 
        type: Number,
        required: [true, 'cantidad es necesaria'],
        
    },
    type: {
        type: String,
        required: [true, 'El tipo es necesario'],
    },
    leg: {
        type: Boolean,
        default: true,
        required: [true, 'El tipo es necesario'],
    },
    eye: {
        type: Boolean,
        default: true,
        required: [true, 'El tipo es necesario'],
    },
    hand: {
        type: Boolean,
        default: true,
        required: [true, 'El tipo es necesario'],
    }
}, { timestamps: true });

PirateSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico porfavor' });
module.exports.Pirate = mongoose.model('Pirate', PirateSchema);