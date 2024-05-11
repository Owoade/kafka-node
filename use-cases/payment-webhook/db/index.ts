import { Sequelize } from "sequelize";
import { PG_DB, PG_PASSWORD, PG_PORT, PG_USER } from "../environment";

const db = new Sequelize({
    username: PG_USER,
    database: PG_DB,
    password: PG_PASSWORD,
    port: PG_PORT
})

export default db;