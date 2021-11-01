const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    nombre: { 
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    apellido: {
        type: String,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        required: [true, 'El apellido es necesario'],
    },
    email: {
        type: String, 
        unique: true,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        required: [true, 'El email es necesario'],
    },
    password: {
        type: String,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        required: [true, 'La contraseña es necesaria'],
    }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico porfavor' });
module.exports.User = mongoose.model('User', UserSchema);