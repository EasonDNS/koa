import { errorMessage } from '../../error';
import { Next } from 'koa';

const verify = async (ctx: any, next: Next) => {
  const { id, ids } = ctx.request.body;
  if (id == null || ids == null) {
    ctx.app.emit('error', errorMessage.userExits, ctx);
    return;
  }
  await next();
};

export { verify };
