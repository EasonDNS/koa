const errorHandler = (error: any, ctx: any) => {
  ctx.body = {
    code: error.code,
    message: error.message,
    result: error,
  };
};
export { errorHandler };
