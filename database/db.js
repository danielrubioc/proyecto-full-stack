require("dotenv").config();
const { Pool } = require("pg");

const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres:root@localhost:5432/menu2";

const pool = process.env.DATABASE_URL
    ? new Pool({
          connectionString: connectionString,
          ssl: { rejectUnauthorized: false },
      })
    : new Pool({ connectionString });

module.exports.query = async (sql) => {
    const client = await pool.connect();
    try {
        const response = await client.query(sql);
        return {
            ok: true,
            datas: response.rows,
        };
    } catch (error) {
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};
