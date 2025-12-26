
import navigationServices from "../services/navigationServices";
import type { Context } from 'koa';

const add = async (ctx:Context) =>{
    const data  = ctx.request.body;
    console.log(data)
    const res = await  navigationServices.add('web','/public/one.png','http://www.baidu.com')
    console.log(res)
}

export {
    add
}
