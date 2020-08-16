const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

const getUsers = (request, response) => {
  client.connect();
  client.query('SELECT * FROM users ORDER BY id ASC;', (err, res) => {
    if (err) response.status(200).json(["hello",err])
    else response.status(200).json(res.rows)
    client.end();
  });
}
module.exports = {
  getUsers
}