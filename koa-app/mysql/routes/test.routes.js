module.exports = app => {  
    const userController = require('../controllers/test.controller');
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
     *  @description add users
     *  @method GET /add-user
     */
    router.get('/add-user',  async (ctx, next) => { 
      await services.add_user(ctx, next)
    })

    /**
     *  @description for update user
     *  @method GET /update-user
     */
    router.get('/update-user', async (ctx, next) => { 
      await services.update_user(ctx, next) 
    })
    
    //API
    router.get('/api/users', async (ctx, next) => { ctx.body = await userController.getAll(ctx,next)});  
    router.post('/api/users',  async (ctx, next) => { ctx.body = await userController.create(ctx,next, ctx.request.body)}); 
    router.get('/api/users/:id',  async (ctx, next) => { ctx.body = await userController.get(ctx,next)});  
    router.put('/api/users/:id',  async (ctx, next) => { ctx.body = await userController.update(ctx,next,ctx.request.body)});
    router.delete('/api/users/:id',  async (ctx, next) => { ctx.body = await userController.delete(ctx,next)}); 
    app.use(router.routes());
    app.use(router.allowedMethods())
};