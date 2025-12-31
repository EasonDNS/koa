import navigationServices from '../services/navigationServices';
import type { Context } from 'koa';

// test--------------------------------------------------------------------------------------
const test = async (ctx: Context) => {
  console.log('ctx.data', ctx.request.body);

  ctx.body = {
    code: 11,
    message: '11',
    data: ctx.request.body,
  };
};
// end--------------------------------------------------------------------------------------

const add = async (ctx: Context) => {
  const data: any = ctx.request.body;
  const res = await navigationServices.add({
    name: data.name,
    icon: data.icon,
    category: data.category,
    url: data.url,
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

export { test, add, getAll };
