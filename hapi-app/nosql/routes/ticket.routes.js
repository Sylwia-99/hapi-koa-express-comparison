const ticketController = require('../controllers/ticket.controller');
const services = require('../../services/render');

module.exports = [ 
    { 
        method: 'GET',
        path: '/css/{file*}',
        handler: {
            directory: {
                path: 'C:/Users/Dawid/Desktop/sylwia/Studia/PracaMagisterska/aplikacje/assets/css',
                listing: true
            }
        }
    },
    { 
        method: 'GET',
        path: '/js/{file*}',
        handler: {
            directory: {
                path: 'C:/Users/Dawid/Desktop/sylwia/Studia/PracaMagisterska/aplikacje/assets/js',
                listing: true
            }
        }
    },
    {
        method: 'GET',
        path:'/',
        handler: async (request, h) => {
            return await services.homeRoutes(request, h)
        }
    },
    {
        method: 'GET',
        path:'/add-ticket',
        handler: async (request, h) => {
            return await services.add_ticket(request, h)
        }
    },
    {
        method: 'GET',
        path:'/update-ticket',
        handler: async (request, h) => {
            return await services.update_ticket(request, h)
        }
    },

    //API
    {
        method: 'GET',
        path: '/api/tickets',
        handler: ticketController.getAll
    },
    { 
        method: 'POST',
        path: '/api/tickets',
        handler:  ticketController.create
    },
    { 
        method: 'GET',
        path:'/api/tickets/{id}',
        handler:  ticketController.get
    },
    { 
        method: 'PUT',
        path:'/api/tickets/{id}',
        handler:  ticketController.update
    },
    { 
        method: 'DELETE',
        path:'/api/tickets/{id}',
        handler:  ticketController.delete
    }
] 