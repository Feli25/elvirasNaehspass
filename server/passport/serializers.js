const passport = require('passport');
const { Client } = require('pg');
const configs = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
}

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  const client = new Client(configs);
  client.connect();

  client.query('SELECT id AS _id, username, password, email FROM users WHERE id=$1', [userIdFromSession])
    .then(userQuery => {
      client.end()
      cb(null, userQuery.rows[0]);
    })
    .catch(err => {
      client && client.end()
      cb(err);
    })
});
