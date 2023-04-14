"use strict";
const Hapi = require("@hapi/hapi");
const vision = require("@hapi/vision");
const inert = require("@hapi/inert");
const ejs = require("ejs");

const init = async () => {
  const port = process.env.PORT || 3000;

  const server = Hapi.server({
    port,
    host: "localhost",
  });

  await server.register([vision, inert]);

  server.views({
    engines: {
      ejs: ejs,
    },
    path: __dirname + "/views",
  });

  const Routes = require("./routes/ticket.routes");

  server.route(Routes);

  await server.start();
};

init();
