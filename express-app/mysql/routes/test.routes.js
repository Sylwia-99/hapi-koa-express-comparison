module.exports = app => {  
    const userController = require('../controllers/test.controller');    
    const ticketController = require('../controllers/ticket.controller');
    const airlineController = require('../controllers/airline.controller');
    const planeController = require('../controllers/plane.controller');
    const airportController = require('../controllers/airport.controller');
    const flightController = require('../controllers/flight.controller');

    const router = require('express').Router();  
    const services = require('../../services/render');

    /**
     *  @description Root Route
     *  @method GET /
     */
    router.get('/', services.homeRoutes);

    /**
     *  @description add tickets
     *  @method GET /add-ticket
     */
        router.get('/add-ticket', services.add_ticket)

    /**
     *  @description for update ticket
     *  @method GET /update-ticket
     */
        router.get('/update-ticket', services.update_ticket)

    //API
    router.get('/api/users/', userController.getAll); 
    router.post('/api/users/', userController.create); 
    router.get('/api/users/:id', userController.get); 
    router.put('/api/users/:id', userController.update); 
    router.delete('/api/users/:id', userController.delete); 

    router.get('/api/tickets/', ticketController.getAll); 
    router.post('/api/tickets/', ticketController.create); 
    router.get('/api/tickets/:id', ticketController.get); 
    router.put('/api/tickets/:id', ticketController.update); 
    router.delete('/api/tickets/:id', ticketController.delete); 

    router.get('/api/flights/', flightController.getAll); 
    router.post('/api/flights/', flightController.create); 
    router.get('/api/flights/:id', flightController.get); 
    router.put('/api/flights/:id', flightController.update); 
    router.delete('/api/flights/:id', flightController.delete); 

    router.get('/api/airports/', airportController.getAll); 
    router.post('/api/airports/', airportController.create); 
    router.get('/api/airports/:id', airportController.get); 
    router.put('/api/airports/:id', airportController.update); 
    router.delete('/api/airports/:id', airportController.delete); 

    router.get('/api/planes/', planeController.getAll); 
    router.post('/api/planes/', planeController.create); 
    router.get('/api/planes/:id', planeController.get); 
    router.put('/api/planes/:id', planeController.update); 
    router.delete('/api/planes/:id', planeController.delete); 

    router.get('/api/airlines/', airlineController.getAll); 
    router.post('/api/airlines/', airlineController.create); 
    router.get('/api/airlines/:id', airlineController.get); 
    router.put('/api/airlines/:id', airlineController.update); 
    router.delete('/api/airlines/:id', airlineController.delete); 
    app.use(router);
};