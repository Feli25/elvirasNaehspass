# Elviras Naehspass in React

push to the live environment (only from master branch)<br/>
git push heroku master<br/>
link: http://www.elviras-naehspass.com/

push from a feature branch to the testing environment<br/>
git push staging *nameofbranch*:master<br/>
link: https://frozen-wave-86999.herokuapp.com/

get the information which db are connected: heroku pg:info --remote *staging or heroku*<br/>
connect to the heroku psql database: heroku pg:psql --remote *staging or heroku*<br/>
see all the tables: \dt <br/>
quit: \q