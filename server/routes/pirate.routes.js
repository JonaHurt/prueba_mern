const PirateController = require('../controllers/pirate.controller');

module.exports = function(app){
    app.get('/api/pirate/all', PirateController.findAllPirate);
    app.get('/api/pirate/find', PirateController.findCapitan);
    app.get('/api/pirate/:id', PirateController.findDetail);
    app.post('/api/pirate/create', PirateController.createPirate);
    
    app.put('/api/pirate/update/:id',PirateController.updatePirate);
    app.put('/api/pirate/updateestatus/:id', PirateController.updateStatus);
    app.delete('/api/pirate/:id', PirateController.deletePirate);
    
    
}