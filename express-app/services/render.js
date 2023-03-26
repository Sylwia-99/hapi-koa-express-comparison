const axios = require('axios');
// const { render } = require('ejs');


exports.homeRoutes =  async (req, res) => {
    axios.get('http://localhost:3000/api/tickets')
        .then(function(response){
            res.render('index', { tickets : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_ticket = (req, res) =>{
    res.render('add_ticket');
}

exports.update_ticket = (req, res) =>{
    axios.get(`http://localhost:3000/api/tickets/${req.query.id}`)
        .then(function(ticketdata){
            res.render("update_ticket", { ticket : ticketdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
