const Pool = require('pg').Pool

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'assessment',
  password: 'postgres',
  port: 5432,
})


