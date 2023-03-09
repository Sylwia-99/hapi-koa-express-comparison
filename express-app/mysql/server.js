const Express = require('express')
const cors = require('cors');
const server = Express()

let corsOptions = {
  origin: 'http://localhost:4200'
}

server.use(cors(corsOptions));
server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));

require('./routes/test.routes')(server);

const port = process.env.PORT || 4000; 

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {            
  console.log(`Example app listening on port ${port}`)
})