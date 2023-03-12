const axios = require('axios');

exports.homeRoutes = async (request, h) => {
    // Make a get request to /api/users
    const response = await axios.get('http://localhost:3000/api/users')
    return h.view("index", {users: response.data})
}

exports.add_user = async (request, h)  =>{
    return h.view("add_user")
}

exports.update_user = async (request, h) =>{
    const response = await axios.get(`http://localhost:3000/api/users/${request.query.id}`)
    return h.view("update_user", {user: response.data})
}
