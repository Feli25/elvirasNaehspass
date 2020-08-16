const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: process.env.DATABASE_URL,
  password: 'password',
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