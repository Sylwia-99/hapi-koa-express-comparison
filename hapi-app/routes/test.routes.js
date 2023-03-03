const userController = require('../controllers/test.controller');

module.exports = [ 
    {
        method: 'GET',
        path:'/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    },
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