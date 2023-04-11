const axios = require('axios');

exports.homeRoutes = async (request, h) => {
    // Make a get request to /api/tickets
    const response = await axios.get('http://localhost:3000/api/tickets')
    return h.view("index", {tickets: response.data})
}

exports.add_ticket = async (request, h)  =>{
    return h.view("add_ticket")
}

exports.update_ticket = async (request, h) =>{
    const response = await axios.get(`http://localhost:3000/api/tickets/${request.query.id}`)
    return h.view("update_ticket", {ticket: response.data})
}
