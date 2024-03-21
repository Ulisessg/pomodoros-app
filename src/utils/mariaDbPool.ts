import mariadb from "mariadb";

const mariaDbPool = mariadb.createPool({
	host: process.env.MARIA_DB_HOST as string,
	user: process.env.MARIA_DB_USER as string,
	password: process.env.MARIA_DB_PASSWORD as string,
	database: process.env.MARIA_DB_DATABASE as string,
	connectionLimit: 5,
});

export default mariaDbPool;
