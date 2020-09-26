# Elviras Naehspass in React

push to the live environment (only from master branch)
git push heroku master

push from a feature branch to the testing environment
git push staging <nameofbranch>:master
link: https://frozen-wave-86999.herokuapp.com/

get the information which db are connected: heroku pg:info --remote <staging or heroku>
connect to the heroku psql database: heroku pg:psql --remote <staging or heroku>
see all the tables: \dt
quit: \q