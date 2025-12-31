// 系统模块--------------------------------------------
// const Router = require('koa-router')
import Router from '@koa/router';
// 用户模块--------------------------------------------
import { add, getAll, test } from '../controllers/navigationControllers';
// 正--------------------------------------------
const navigationRouter = new Router({ prefix: '/navigation' });
// 查询所有数据--------------------------------------------------------------------------------------
navigationRouter.get('/', getAll);

navigationRouter.post('/add', add);
navigationRouter.post('/test', test);

export default navigationRouter;
