import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

// const config = {
//     connectionString: process.env.DATABASE_URL
// }

if(process.env.MODE === "PROD"){
    config.ssl = {
        rejectUnauthorized: false
    }
}

let config = {
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "shortly_database"
}

const db = new Pool(config);

export default db;