const Express = require('express')
const cors = require('cors');
const server = Express()
const path = require('path');

let corsOptions = {
  origin: 'http://localhost:4200'
}

server.use(cors(corsOptions));
server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));

server.set("view engine", "ejs")

// load assets
server.use('/css', Express.static(path.resolve(__dirname, "../../assets/css")))
server.use('/img', Express.static(path.resolve(__dirname, "../../assets/img")))
server.use('/js', Express.static(path.resolve(__dirname, "../../assets/js")))

require('./routes/test.routes')(server);

const port = process.env.PORT || 3000; 

server.listen(port, () => {     
  console.log(`Example app listening on port ${port}`)
})