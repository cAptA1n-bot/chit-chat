import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.PG_DATABASE_URL
})

const connectPG = async () => {

    const client = await pool.connect();
    console.log("PostgreSQL connected...");
    client.release();

}

export { pool, connectPG };