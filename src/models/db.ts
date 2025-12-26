import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const getConnection = async () => {
  try {
    return await pool.getConnection();
  } catch (err) {
    console.error('数据库连接失败');
    console.log(err);
  }
};
// export default pool;
export default getConnection;
