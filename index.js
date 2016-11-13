const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug');
      bodyParser = require('body-parser');
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('wille','wille', '', {dialect: 'postgres' });

// Model
// A guery can hold a question and a signature
var Query = sequelize.define('query', {
  question: Sequelize.TEXT,
  signature: Sequelize.STRING
});

// log server behaviour in terminal
app.use(morgan('dev'));

// parse http body so we can pass it as string??
app.use(bodyParser.urlencoded({ extended: false }));

// tell express that we are using pug as view engine.
app.set('view engine', 'pug');


// Setting app pug to root
app.get('/', (request, response) =>{
  Query.findAll({ order: 'id DESC' }).then((query) => {
    response.render('queries/index', { queries: query });
  });
});

app.get('/queries/new', (request, response) => {
  response.render('queries/new');
});

// Redirect user to frontpage after posting question
app.post('/postquery', (request, response) => {

  if (request.body.question) {
    Query.create(request.body).then(() => {
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
