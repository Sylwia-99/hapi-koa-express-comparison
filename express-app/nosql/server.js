const Express = require("express");
const server = Express();
const path = require("path");

server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));

server.set("view engine", "ejs");

// load assets
server.use("/css", Express.static(path.resolve(__dirname, "../../assets/css")));
server.use("/img", Express.static(path.resolve(__dirname, "../../assets/img")));
server.use("/js", Express.static(path.resolve(__dirname, "../../assets/js")));

require("../nosql/routes/ticket.routes")(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {});
