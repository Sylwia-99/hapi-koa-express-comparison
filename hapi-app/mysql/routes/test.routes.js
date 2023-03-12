const userController = require('../controllers/test.controller');
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
        path:'/add-user',
        handler: async (request, h) => {
            return await services.add_user(request, h)
        }
    },
    {
        method: 'GET',
        path:'/update-user',
        handler: async (request, h) => {
            return await services.update_user(request, h)
        }
    },

    //API
    {
        method: 'GET',
        path: '/api/users',
        handler: userController.getAll
    },
    { 
        method: 'POST',
        path: '/api/users',
        handler:  userController.create
    },
    { 
        method: 'GET',
        path:'/api/users/{id}',
        handler:  userController.get
    },
    { 
        method: 'PUT',
        path:'/api/users/{id}',
        handler:  userController.update
    },
    { 
        method: 'DELETE',
        path:'/api/users/{id}',
        handler:  userController.delete
    }
] 