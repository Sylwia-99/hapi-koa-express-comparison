const render = require('koa-ejs');
const static =  require('koa-static');
const path = require('path');
const Koa = require('koa');
const app = new Koa();
const port = process.env.PORT || 3000; 

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'index',
  viewExt: 'ejs',
})

// load assets
app.use(static(path.join(__dirname, "../../assets")))

app.listen(port);
require('./routes/ticket.routes')(app);
