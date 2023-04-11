module.exports = app => {  
    const ticketController = require('../controllers/ticket.controller');
    const bodyParser = require('koa-bodyparser');
    const services = require('../../services/render');
    const Router = require('koa-router');
    const router = new Router();  
    app.use(bodyParser())

    /**
     *  @description Root Route
     *  @method GET /
     */
    router.get('/', async (ctx, next) => {  
      await services.homeRoutes(ctx, next) 
    })

    /**
     *  @description add tickets
     *  @method GET /add-ticket
     */
    router.get('/add-ticket',  async (ctx, next) => { 
      await services.add_ticket(ctx, next)
    })

    /**
     *  @description for update ticket
     *  @method GET /update-ticket
     */
    router.get('/update-ticket', async (ctx, next) => { 
      await services.update_ticket(ctx, next) 
    })
    
    //API
    router.get('/api/tickets', async (ctx, next) => { ctx.body = await ticketController.getAll(ctx,next)});  
    router.post('/api/tickets',  async (ctx, next) => { ctx.body = await ticketController.create(ctx,next, ctx.request.body)}); 
    router.get('/api/tickets/:id',  async (ctx, next) => { ctx.body = await ticketController.get(ctx,next)});  
    router.put('/api/tickets/:id',  async (ctx, next) => { ctx.body = await ticketController.update(ctx,next,ctx.request.body)});
    router.delete('/api/tickets/:id',  async (ctx, next) => { ctx.body = await ticketController.delete(ctx,next)}); 
    app.use(router.routes());
    app.use(router.allowedMethods())
};