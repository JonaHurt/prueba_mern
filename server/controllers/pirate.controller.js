const {Pirate}  = require('../models/pirate.model')

module.exports.createPirate = (request, response) => {
    const { nombre, image, type,leg, eye, hand, chest } = request.body
    Pirate.create({
        nombre,
        image,
        type,
        leg,
        eye,
        hand,
        chest
    }).then(pirate => response.status(200).json(pirate))
    .catch(err => response.status(400).json(err));
}
module.exports.findDetail = (request, response) => {
    Pirate.findById({_id:request.params.id}).then(pirate => response.json(pirate))
    .catch(err => response.json(err));
}

module.exports.findAllPirate = (request, response) => {
    //Movie.find({}).populate('usuarios').exec().then(movie => response.json(movie))
    Pirate.find({}).sort('nombre').then(pirate => response.json(pirate))    
   .catch(err => response.json(err))
};


module.exports.updatePirate = (request, response) => {
    Pirate.findOneAndUpdate({_id: request.params.id}, request.body, { new:true})
        .then(updatedPirate => response.status(200).json(updatedPirate))
        .catch(err => response.status(400).json(err))
}


module.exports.updateStatus = (request, response) => {
    Pirate.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPirate => response.json( updatedPirate))
        .catch(err => response.json(err))
}


module.exports.deletePirate = (request, response) => {
    Pirate.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.findCapitan = (request, response) => {
    Pirate.find({type: 'Capitan'}).then(
         
        pirate => {
            console.log(pirate);
            if( pirate.length > 0){
                response.json('ok')
            } else {
                response.json('error')
            }
        }
        
    

        )
    .catch(err => response.status(400).json(err));
}