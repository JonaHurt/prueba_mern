const {User}  = require('../models/user.model')

module.exports.createUser = (request, response) => {
    const { nombre, apellido, email,password } = request.body;
    User.create({
        nombre,
        apellido,
        email,
        password
    }).then(user => response.status(200).json(user))
    .catch(err => response.status(400).json(err));

}

/*
module.exports.findByEmail = (request, response) => {
    User.findOne({email :request.params.email}).then(user => response.json(user))
    .catch(err => response.json(err));
}*/


module.exports.findForLogin = (request, response) => {
    User.findOne({email :request.body.email}).then(
        user => {
            if(!user){
                response.json({
                    message: 'Usuario no encontrado'
                })
            }else{
                if(user.password === request.body.password){
                    response.json(user)
                }else{
                    response.json({
                        message: 'Contraseña incorrecta'
                    })
                }
            }
        
    }).catch(err => response.json(err));
}

module.exports.findAllUser = (request, response) => {
    User.find({}).then(user => response.json(user))
    .catch(err => response.estatus(500).json(err));
 }