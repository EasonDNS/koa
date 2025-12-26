import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET || 'google';
const authMiddleware = async (ctx: Context, next: Next) => {
  // 1. 获取请求头中的 Authorization
  // 格式通常是: "Bearer <token>"
  const authHeader = ctx.header.authorization;

  if (!authHeader) {
    ctx.status = 401;
    ctx.body = {
      message: '没有授权 缺少 Token',
    };
    return;
  }

  const token = authHeader.split(' ')[1]; // 拿到 Bearer后面的总价
  if (!token) {
    ctx.status = 401;
    ctx.body = {
      message: '没有授权,Token 格式错误 ',
    };
    return;
  }

  try {
    // 3. 验证 Token
    // 如果验证失败（过期或被篡改），这里会抛出错误
    const decoded = jwt.verify(token, SECRET);

    // 4. 将用户信息挂载到 ctx.state 上
    // 这样后续的控制器（比如上传图片）就可以通过 ctx.state.user 拿到用户ID了
    ctx.state.user = decoded;

    // 5. 放行，进入下一个中间件
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: '未授权：Token 无效或已过期' };
  }
};

export { authMiddleware };
