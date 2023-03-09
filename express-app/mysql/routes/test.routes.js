module.exports = app => {  
    const userController = require('../controllers/test.controller');
    const router = require('express').Router();  
    router.get('/', userController.getAll); 
    router.post('/', userController.create); 
    router.get('/:id', userController.get); 
    router.put('/:id', userController.update); 
    router.delete('/:id', userController.delete); 
    app.use('/api/users', router);
};