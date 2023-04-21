const ticketController = require("../controllers/ticket.controller");
const services = require("../../services/render");
const perfy = require("perfy");

module.exports = [
  {
    method: "GET",
    path: "/css/{file*}",
    handler: {
      directory: {
        path: "C:/Users/Dawid/Desktop/sylwia/Studia/PracaMagisterska/aplikacje/assets/css",
        listing: true,
      },
    },
  },
  {
    method: "GET",
    path: "/js/{file*}",
    handler: {
      directory: {
        path: "C:/Users/Dawid/Desktop/sylwia/Studia/PracaMagisterska/aplikacje/assets/js",
        listing: true,
      },
    },
  },
  {
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      return await services.homeRoutes(request, h);
    },
  },
  {
    method: "GET",
    path: "/add-ticket",
    handler: async (request, h) => {
      return await services.add_ticket(request, h);
    },
  },
  {
    method: "GET",
    path: "/update-ticket",
    handler: async (request, h) => {
      return await services.update_ticket(request, h);
    },
  },

  //API
  {
    method: "GET",
    path: "/api/tickets",
    handler: async (request, h) => {
      let times = [];
      perfy.start("get-time");
      const data = await ticketController.getAll(request, h);
      const time = perfy.end("get-time").fullMilliseconds;
      await times.push(time);
      // console.log(times);
      return data;
    },
  },
  {
    method: "POST",
    path: "/api/tickets",
    handler: async (request, h) => {
      let times = [];
      perfy.start("get-time");
      const data = await ticketController.create(request, h);
      const time = perfy.end("get-time").fullMilliseconds;
      await times.push(time);
      // console.log(times);
      return data;
    },
  },
  {
    method: "GET",
    path: "/api/tickets/{id}",
    handler: async (request, h) => {
      let times = [];
      perfy.start("get-time");
      const data = await ticketController.get(request, h);
      const time = perfy.end("get-time").fullMilliseconds;
      await times.push(time);
      // console.log(times);
      return data;
    },
  },
  {
    method: "PUT",
    path: "/api/tickets/{id}",
    handler: async (request, h) => {
      let times = [];
      perfy.start("get-time");
      const data = await ticketController.update(request, h);
      const time = perfy.end("get-time").fullMilliseconds;
      await times.push(time);
      console.log(times);
      return data;
    },
  },
  {
    method: "DELETE",
    path: "/api/tickets/{id}",
    handler: async (request, h) => {
      let times = [];
      perfy.start("get-time");
      const data = await ticketController.delete(request, h);
      const time = perfy.end("get-time").fullMilliseconds;
      await times.push(time);
      // console.log(times);
      return data;
    },
  },
];
