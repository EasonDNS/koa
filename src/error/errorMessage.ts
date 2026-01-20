const errorMessage = {
  passwordError: {
    code: 1,
    message: '用户密码错误~',
    result: '',
  },
  userExits: {
    code: 2,
    message: '用户已存在',
    result: '',
  },
  verifyError: {
    code: 3,
    message: '验证没有通过 请检查传入的参数等是否正确',
    result: '',
  },
  parameterError: {
    code: 4,
    message: '传入的参数错误 请检查 参数 格式是否正确!',
  },
};
export { errorMessage };
