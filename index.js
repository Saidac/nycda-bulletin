const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug');
      bodyParser = require('body-parser');
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('wille','wille', '', {dialect: 'postgres' });

// Model
var Bulletin = sequelize.define('bulletin', {
  title: Sequelize.STRING,
  message: Sequelize.TEXT
});

// log server behaviour in terminal
app.use(morgan('dev'));

// parse http body so we can pass it as string??
app.use(bodyParser.urlencoded({ extended: false }));

// tell express that we are using pug as view engine.
app.set('view engine', 'pug');


// Setting app pug to root
app.get('/', (request, response) =>{
  Bulletin.findAll({ order: 'id ASC' }).then((bulletin) => {
    response.render('bulletins/index', { bulletins: bulletin });
  });
});

app.get('/bulletins/new', (request, response) => {
  response.render('bulletins/new');
});

// Create new bulletin function
app.post('/postmessage', (request, response) => {

  if (request.body.title) {
    Bulletin.create(request.body).then(() => {
      response.redirect('/');
    });
  } else {
    response.redirect('/');
  }
});

sequelize.sync().then(() => {
  console.log('Connected to db');
  app.listen(3001, () => {
    console.log('Web Server is running on port 3001');
  });
});
