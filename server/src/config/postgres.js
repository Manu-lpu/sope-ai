const { Pool } = require("pg");

const pool = new Pool({
  user: "manu",
  host: "localhost",
  database: "sope",
  port: 5432,
});

module.exports = pool;