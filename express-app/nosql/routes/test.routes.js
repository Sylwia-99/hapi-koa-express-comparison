module.exports = app => {  
    const userController = require('../controllers/test.controller');
    const router = require('express').Router();  
    const services = require('../../services/render');

    /**
     *  @description Root Route
     *  @method GET /
     */
    router.get('/', services.homeRoutes);

    /**
     *  @description add users
     *  @method GET /add-user
     */
    router.get('/add-user', services.add_user)

    /**
     *  @description for update user
     *  @method GET /update-user
     */
    router.get('/update-user', services.update_user)

    //API
    router.get('/api/users/', userController.getAll); 
    router.post('/api/users/', userController.create); 
    router.get('/api/users/:id', userController.get); 
    router.put('/api/users/:id', userController.update); 
    router.delete('/api/users/:id', userController.delete); 
    app.use(router);
};