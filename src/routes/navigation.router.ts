// 系统模块--------------------------------------------
// const Router = require('koa-router')
import Router from '@koa/router';
// 用户模块--------------------------------------------

import {add} from '../controllers/navigationControllers'
// 正--------------------------------------------
const navigationRouter = new Router({ prefix: '/navigation' });

navigationRouter.post('/add', add);

export default navigationRouter;
