const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.SSL_SETTING || false,
});

client.connect();

const getUsers = (request, response) => {
  client.query('SELECT * FROM users ORDER BY id ASC;', (err, res) => {
    if (err) response.status(200).json(["hello",err])
    else response.status(200).json(res.rows)
    client.end();
  });
}
module.exports = {
  getUsers
}