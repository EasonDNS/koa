import pool from '../models/db';
import type { INavigationField } from './Types';

class NavigationServices {
  //添加 --------------------------------------------------------------------------------------
  // 只插入 name 和 url，其他字段 (iconUrl, category) 会自动变成数据库表里定义的 default 值
  async add(data: INavigationField) {
    // 假设 pool() 返回一个 promise-based 的连接，例如来自 mysql2/promise
    console.log(data);
    // 定义连接变量，以便在 try/catch/finally 中都能访问
    let conn: any;

    try {
      // 1. 从连接池获取一个连接
      conn = await pool();

      // 2. 判断是需要生成 ids 还是直接插入
      // =================  CASE 1: 自动生成 ids (核心事务逻辑) =================
      if (!data.ids) {
        // 2a. 开始事务
        await conn.beginTransaction();
        console.log('Transaction started: generating new ids...');
        // 2b. 查询当前最大ids并锁定，防止并发冲突
        // 注意：这里使用 conn.query()
        const sqlSelect = `SELECT IFNULL(MAX(ids), 0) + 1 as nextId FROM navigation FOR UPDATE;`;

        const result: any = await conn.query(sqlSelect);

        // 2c. 将新获取的 nextId 添加到要插入的数据中

        data.ids = result[0].nextId;

        // 2d. 动态构建 SQL 语句（现在 data.ids 肯定有值了）
        const fields = ['name', 'url'];
        const values = [':name', ':url'];
        if (data.category) {
          fields.push('category');
          values.push(':category');
        }
        if (data.icon) {
          fields.push('icon');
          values.push(':icon');
        }
        fields.push('ids'); // 必须包含 ids
        values.push(':ids');

        const sql = `INSERT INTO navigation (${fields.join(', ')}) VALUES (${values.join(', ')})`;
        // 2e. 在事务中执行插入
        const res = await conn.execute(sql, data);

        // 2f. 如果一切顺利，提交事务
        await conn.commit();
        console.log('Transaction committed successfully!');
        return res;
      }
      // =================  CASE 2: 用户已提供 ids (简单插入) =================
      else {
        console.log(
          `Inserting with user-provided ==================>ids: ${data.ids}`
        );
        const fields = ['name', 'url'];
        const values = [':name', ':url'];
        if (data.category) {
          fields.push('category');
          values.push(':category');
        }
        if (data.icon) {
          fields.push('icon');
          values.push(':icon');
        }
        fields.push('ids');
        values.push(':ids');

        const sql = `INSERT INTO navigation (${fields.join(', ')}) VALUES (${values.join(', ')})`;

        return await conn.execute(sql, data);
      }
    } catch (error) {
      // 3. 如果 try 块中发生任何错误
      console.error('Error during database operation:', error);

      // 如果连接存在并且事务已开始，则回滚事务
      if (conn) {
        console.log('Rolling back transaction...');
        await conn.rollback();
      }

      // 将错误向上抛出，以便调用者可以处理它
      throw error;
    } finally {
      // 4. 无论成功还是失败，最后都必须释放连接回连接池
      if (conn) {
        conn.release();
        console.log('Connection released.');
      }
    }

    // end----------------------------------------------------------------------------------

    //   const fields: string[] = ['name', 'url'];
    //   const values: string[] = [':name', ':url'];
    //   // 判断data中是否有这两个值 ,有就添加这在sql语句中传了我就添加这个字段-
    //   // -------------------------------------------------------------------------------------
    //   if (data.category) {
    //     fields.push('category');
    //     values.push(':category');
    //   }
    //   if (data.icon) {
    //     fields.push('icon');
    //     values.push(':icon');
    //   }
    //   if (data.ids) {
    //     fields.push('ids');
    //     values.push(':@next_ids');
    //   }
    //
    //   const sql = `INSERT INTO navigation (${fields.join(', ')})
    // VALUES (${values.join(', ')})`;
    //   let conn: any;
    //   try {
    //     conn = await pool();
    //     if (!data.ids) {
    //       await conn.beginTransaction();
    //
    //       const [rows]: [any[], any] = await conn.query(
    //         'SELECT IFNULL(MAX(ids), 0) + 1 as nextId FROM navigation FOR UPDATE'
    //       );
    //       const nextId = rows[0].nextId;
    //       data.ids = nextId;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     console.log('finally');
    //   }
    //添加一个判断--------------------------------------------------------------------------------------
    // if (conn) {
    //   return await conn.execute(sql, data);
    // }
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
