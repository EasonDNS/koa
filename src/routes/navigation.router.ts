// 系统模块--------------------------------------------
// const Router = require('koa-router')
import Router from '@koa/router';
// 用户模块--------------------------------------------
import {
  add,
  getAll,
  patch,
  test,
} from '../controllers/navigation/navigationControllers';
import { verify } from '../middleware/navigation';
// 正--------------------------------------------
const navigationRouter = new Router({ prefix: '/navigation' });

// 查询所有数据--------------------------------------------------------------------------------------
navigationRouter.get('/', getAll);
navigationRouter.patch('/patch/:id', verify, patch);
navigationRouter.post('/add', add);
navigationRouter.patch('/test', test);

export default navigationRouter;
