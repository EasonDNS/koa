// const fs = require('fs')
import fs from 'fs';
import path from 'path';
import Router from '@koa/router';

// const Router = require('koa-router')
const router = new Router();
fs.readdirSync(__dirname).forEach((file) => {
    // 1. 过滤掉 index.ts 自己，以及非 .ts/.js 文件
    if (file === 'index.ts' || (!file.endsWith('.ts') && !file.endsWith('.js'))) {
        return;
    }

    // 2. 动态加载路由文件
    const fullPath = path.join(__dirname, file);
    const routeModule = require(fullPath);
    console.log("-------------------")
    console.log(routeModule)
    // 3. 【关键修复】兼容 TypeScript 的 default 导出
    // 如果是 export default，路由实例在 routeModule.default 里
    // 如果是 module.exports，路由实例就是 routeModule 本身
    const route = routeModule.default || routeModule;

    // 4. 安全检查：确保它真的是一个 Router 实例（有 routes 方法）
    if (route && typeof route.routes === 'function') {
        router.use(route.routes());
        router.use(route.allowedMethods());
        console.log(`✅ Loaded route: ${file}`);
    } else {
        console.warn(`⚠️  Warning: File "${file}" does not export a valid Router instance.`);
    }
});

// fs.readdirSync(__dirname).forEach((f) => {
//   if (f !== 'index.ts') {
//     let r = require('./' + f);
//     // console.log('===========================one ===============')
//     // console.log(r)
//     // console.log('===========================one ===============')
//     router.use(r.routes());
//   }
// });

// module.exports = router
export default router;
