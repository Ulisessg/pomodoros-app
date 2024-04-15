import mariadb from "mariadb";

const mariaDbPool = mariadb.createPool({
	host: process.env.DATA_DB_HOST as string,
	user: process.env.DATA_DB_USER as string,
	password: process.env.DATA_DB_PASSWORD as string,
	database: process.env.DATA_DB_DATABASE as string,
	port: Number(process.env.DATA_DB_PORT),
	connectionLimit: 5,
});

export default mariaDbPool;
