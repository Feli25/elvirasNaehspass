const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PGSQL_USER_INFO,
  host: process.env.PGSQL_HOST,
  database: process.env.DATABASE_URL,
  password: process.env.PGSQL_PASSWORD,
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      response.status(200).json(["hello", error])
    } else {
      response.status(200).json(results.rows)
    }
  })
}
module.exports = {
  getUsers
}