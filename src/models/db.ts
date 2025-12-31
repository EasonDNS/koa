import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 15,
  //mariadb :name 写法 默认是关闭的,
  //   INSERT INTO navigation (name, category, icon, url)
  //   VALUES (:name, :category, :icon, :url)
  namedPlaceholders: true,
});

const getConnection = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    return connection;
  } catch (err) {
    console.error('数据库连接失败');
    console.log(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
// export default pool;
export default getConnection;
