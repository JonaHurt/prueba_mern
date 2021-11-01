const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const PirateSchema = new mongoose.Schema({
    nombre: { 
        type: String,
        required: [true, 'El nombre es necesario'],
        minlength: [1, ' debe tener al menos 1 caracteres'],
       
    },
    image: { 
        type: String,
        required: [true, 'El nombre es necesario'],
        minlength: [1, ' debe tener al menos 1 caracteres'],
        
    },
    chest: { 
        type: Number,
        required: [true, 'cantidad es necesaria'],
        minlength: [1, ' debe tener al menos 1 caracteres'],
        
    },
    type: {
        type: String,
        required: [true, 'El tipo es necesario'],
        minlength: [1, ' debe tener al menos 1 caracteres'],
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