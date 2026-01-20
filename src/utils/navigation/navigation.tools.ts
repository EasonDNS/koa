import type { IDbResponse } from './Type';
import pool from '../../models/db';

const publicConn = async <T>(
  sql: string,
  params: any[]
): Promise<IDbResponse<T>> => {
  let conn;
  let res: IDbResponse<T> = {
    code: 1,
    message: '',
    data: '' as T,
  };
  try {
    conn = await pool();
    if (conn) {
      const result = await conn.execute(sql, params);
      res.code = 0;
      res.data = result as T;
      res.message = `执行 sql 语句 ${sql} ,成功`;
      return res;
    } else {
      throw new Error('获取conn连接 失败请检查 conn数据库');
    }
  } catch (error) {
    console.log(error);
    res.code = 1;
    res.message = '获取conn连接 失败请检查 conn数据库';
    res.data = error as T;
    return res;
  } finally {
    if (conn) {
      conn.release();
      console.log('conn 释放连接成功~~');
    }
  }
};

export { publicConn };
