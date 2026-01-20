import navigationServices from '../../services/navigation/navigationServices';
import type { Context } from 'koa';
import type { IPatchIds } from './Type';
import { errorMessage } from '../../error';
// test--------------------------------------------------------------------------------------
const test = async (ctx: Context) => {
  console.log('ctx.data', ctx.request.body);

  ctx.body = {
    code: 1,
    message: '11',
    data: ctx.request.body,
  };
};
// end--------------------------------------------------------------------------------------

const add = async (ctx: Context) => {
  const data: any = ctx.request.body;
  const res = await navigationServices.add({
    name: data.name,
    imgUrl: data.imgUrl,
    category: data.category,
    url: data.url,
    ids: data.ids,
  });
  ctx.body = {
    code: 11,
    message: 'this is success',
    data: res,
  };
};
// 查询所有信息--------------------------------------------------------------------------------------
const getAll = async (ctx: Context) => {
  const res = await navigationServices.getAll();
  ctx.body = {
    code: 200,
    message: '查询数据库成功',
    data: res,
  };
  return res;
};
// 这里ctx 使用Context 一直解决不了id 只能使用any 以后想到办法再说
// 写一个中间件去验证传递的参数
const patch = async (ctx: Context) => {
  // 这里需要先把body里的类型 设为 unknown 然后再设置为 自己定义的接口类型  后面的 {}  是用来保底的. 不然要报错
  //IPatchIds 定义必须有id ids
  const data: IPatchIds = (ctx.request.body as unknown as IPatchIds) || {};

  if (data.id == null || data.ids == null) {
    return ctx.app.emit('error', errorMessage.parameterError, ctx);
  }

  ctx.body = await navigationServices.patch({
    id: data.id,
    ids: data.ids,
    name: data.name,
  });
};
export { test, add, getAll, patch };
