const axios = require('axios');


exports.homeRoutes = async (ctx, next) => {
    // Make a get request to /api/tickets
    const res = await axios.get('http://localhost:3000/api/tickets')
    return ctx.render("index", {
      tickets: res.data
    });
}

exports.add_ticket = async (ctx, next) =>{
    return await ctx.render("add_ticket", {layout: 'add_ticket'})
}

exports.update_ticket = async (ctx, next) =>{
    const res = await axios.get(`http://localhost:3000/api/tickets/${ctx.query.id}`)
    return ctx.render("update_ticket", {
        ticket: res.data, layout: 'update_ticket'
    })
}
