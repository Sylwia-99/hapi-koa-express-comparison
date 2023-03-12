const axios = require('axios');


exports.homeRoutes = async (ctx, next) => {
    // Make a get request to /api/users
    const res = await axios.get('http://localhost:3000/api/users')
    return ctx.render("index", {
      users: res.data
    });
}

exports.add_user = async (ctx, next) =>{
    return await ctx.render("add_user", {layout: 'add_user'})
}

exports.update_user = async (ctx, next) =>{
    const res = await axios.get(`http://localhost:3000/api/users/${ctx.query.id}`)
    return ctx.render("update_user", {
        user: res.data, layout: 'update_user'
    })
}
