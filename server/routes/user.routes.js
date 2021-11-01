const UserController = require('../controllers/user.controller');
module.exports = function(app){
    app.post('/api/user/create', UserController.createUser)
    app.get('/api/user/all', UserController.findAllUser)
    app.post('/api/user/login', UserController.findForLogin)
    

    
}