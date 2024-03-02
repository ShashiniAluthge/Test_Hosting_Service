const { createPool } = require("mysql");
const pool = createPool({
  host: process.env.MYSQL_HOST2,
  user: process.env.MYSQL_USER2,
  password: process.env.MYSQL_PASSWORD2,
  database: process.env.MYSQL_DATABASE2,
  connectionLimit: 10,
});
module.exports = pool;
