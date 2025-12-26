import pool from '../models/db';

class NavigationServices {
  //添加 --------------------------------------------------------------------------------------
  // 只插入 name 和 url，其他字段 (iconUrl, category) 会自动变成数据库表里定义的 default 值
  async add(name: string, icon: string, url: string) {
    const sql = 'INSERT INTO navigation (name,icon, url) VALUES (?, ?,?)';
    const conn = await pool();
    //添加一个判断--------------------------------------------------------------------------------------
    if (conn) {
      const res = await conn.execute(sql, [name, icon, url]);
        console.log("res---------------------------------")
        console.log(res)
        console.log("res---------------------------------")
      return res;
    }
  }

  // const result = await conn.query(sql, [nameVal, urlVal]);
}

export default new NavigationServices();
