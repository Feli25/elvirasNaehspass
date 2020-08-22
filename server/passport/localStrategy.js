const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const configs = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
}

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  (username, password, done) => {
    const client = new Client(configs);
    client.connect();

    client.query('SELECT id AS _id, username, password, email FROM users WHERE username=$1',[ username ])
      .then(foundUserQuery => {
        const foundUser = foundUserQuery.rows[0]
        if (!foundUser) {
          done(null, false, { message: 'Incorrect username' });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, { message: 'Incorrect password' });
          return;
        }

        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));
