module.exports = (app) => {
  const ticketController = require("../controllers/ticket.controller");
  const router = require("express").Router();
  const services = require("../../services/render");
  const perfy = require("perfy");

  /**
   *  @description Root Route
   *  @method GET /
   */
  router.get("/", services.homeRoutes);

  /**
   *  @description add tickets
   *  @method GET /add-ticket
   */
  router.get("/add-ticket", services.add_ticket);

  /**
   *  @description for update ticket
   *  @method GET /update-ticket
   */
  router.get("/update-ticket", services.update_ticket);

  //API
  router.get("/api/tickets/", async (req, res) => {
    let times = [];
    perfy.start("get-time");
    await ticketController.getAll(req, res);
    const time = perfy.end("get-time").fullMilliseconds;
    await times.push(time);
    // console.log(times);
  });
  router.post("/api/tickets/", async (req, res) => {
    let times = [];
    perfy.start("get-time");
    await ticketController.create(req, res);
    const time = perfy.end("get-time").fullMilliseconds;
    await times.push(time);
    // console.log(times);
  });
  router.get("/api/tickets/:id", async (req, res) => {
    let times = [];
    perfy.start("get-time");
    await ticketController.get(req, res);
    const time = perfy.end("get-time").fullMilliseconds;
    await times.push(time);
    // console.log(times);
  });
  router.put("/api/tickets/:id", async (req, res) => {
    let times = [];
    perfy.start("get-time");
    await ticketController.update(req, res);
    const time = perfy.end("get-time").fullMilliseconds;
    await times.push(time);
    console.log(times);
  });
  router.delete("/api/tickets/:id", async (req, res) => {
    let times = [];
    perfy.start("get-time");
    await ticketController.delete(req, res);
    const time = perfy.end("get-time").fullMilliseconds;
    await times.push(time);
    // console.log(times);
  });
  app.use(router);
};
