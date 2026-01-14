import Koa from 'koa';
import KoaStatic from 'koa-static';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import mount from 'koa-mount';
import path from 'path';
import router from './routes/index';
import dotenv from 'dotenv';

dotenv.config();
const app = new Koa();
app.use(
  cors({
    origin: '*',
    allowMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFields: 200 * 1024 * 1024,
      keepExtensions: true,
    },
  })
);
// 加上 mount('/file') 后，用户必须访问 http://localhost:3000/file/avatar.jpg。
app.use(mount('/file', KoaStatic(path.join(__dirname, '../public'))));

app.use(router.routes());
app.use(router.allowedMethods());
// 给 JSON.stringify 加 BigInt 处理器
// 如果你不想每个地方都 Number()，可以统一处理：
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

app.listen(process.env.PORT, () => {
  console.log('routes', router.routes);
  console.log(`🚀 项目启动成功: http://localhost:${process.env.PORT}`);
  console.log(`📂 静态资源路径: http://localhost:${process.env.PORT}/file/`);
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});
