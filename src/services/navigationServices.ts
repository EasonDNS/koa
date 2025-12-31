import pool from '../models/db';
import type { INavigationField } from './Types';

class NavigationServices {
  //添加 --------------------------------------------------------------------------------------
  // 只插入 name 和 url，其他字段 (iconUrl, category) 会自动变成数据库表里定义的 default 值
  async add(data: INavigationField) {
    const fields: string[] = ['name', 'url'];
    const values: string[] = [':name', ':url'];
    // 判断data中是否有这两个值 ,有就添加这在sql语句中传了我就添加这个字段-
    // -------------------------------------------------------------------------------------
    if (data.category) {
      fields.push('category');
      values.push(':category');
    }
    if (data.icon) {
      fields.push('icon');
      values.push(':icon');
    }
    const sql = `INSERT INTO navigation (${fields.join(', ')})
  VALUES (${values.join(', ')})`;
    const conn = await pool();
    //添加一个判断--------------------------------------------------------------------------------------
    if (conn) {
      return await conn.execute(sql, data);
    }
  }
  // 查询所有数据 --------------------------------------------------------------------------------------
  async getAll() {
    const sql = 'SELECT * FROM navigation';
    const conn = await pool();
    if (conn) {
      return await conn.execute(sql);
    } else return;
  }

  async test(data: any) {
    console.log(data);
  }
}

export default new NavigationServices();
