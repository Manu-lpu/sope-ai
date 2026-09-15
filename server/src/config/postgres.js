const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.POSTGRES_URI ||
    "postgresql://postgres:postgres@localhost:5432/sope",
});

module.exports = { pool };
