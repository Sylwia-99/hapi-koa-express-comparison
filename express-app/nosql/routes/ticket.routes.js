module.exports = app => {  
    const ticketController = require('../controllers/ticket.controller');
    const router = require('express').Router();  
    const services = require('../../services/render');

    /**
     *  @description Root Route
     *  @method GET /
     */
    router.get('/', services.homeRoutes);

    /**
     *  @description add ticket
     *  @method GET /add-ticket
     */
    router.get('/add-ticket', services.add_ticket)

    /**
     *  @description for update ticket
     *  @method GET /update_ticket
     */
    router.get('/update-ticket', services.update_ticket)

    //API
    router.get('/api/tickets/', ticketController.getAll); 
    router.post('/api/tickets/', ticketController.create); 
    router.get('/api/tickets/:id', ticketController.get); 
    router.put('/api/tickets/:id', ticketController.update); 
    router.delete('/api/tickets/:id', ticketController.delete); 
    app.use(router);
};