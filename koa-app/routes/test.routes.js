module.exports = app => {  
    const userController = require('../controllers/test.controller');
    const bodyParser = require('koa-bodyparser');
    const Router = require('koa-router');
    const router = new Router({
        prefix: '/api/users'
      });  
    app.use(bodyParser())
    router.get('/', async (ctx, next) => { ctx.body = await userController.getAll(ctx,next)});  
    router.post('/',  async (ctx, next) => { ctx.body = await userController.create(ctx,next, ctx.request.body)}); 
    router.get('/:id',  async (ctx, next) => { ctx.body = await userController.get(ctx,next)});  
    router.put('/:id',  async (ctx, next) => { ctx.body = await userController.update(ctx,next,ctx.request.body)});
    router.delete('/:id',  async (ctx, next) => { ctx.body = await userController.delete(ctx,next)}); 
    app.use(router.routes());
    app.use(router.allowedMethods())
};