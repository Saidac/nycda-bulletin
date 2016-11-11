const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug');
      methodOverride = require('method-override');
      bodyParser = require('body-parser');
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('wille','wille', '', {dialect: 'postgres' });

// require bulletin router module
var bulletinsRouter = require('./routes/bulletins');

// Model
var Bulletin = sequelize.define('bulletin', {
  title: Sequelize.STRING,
  message: Sequelize.TEXT
});

// tell express to look for static files in public
app.use(express.static('public'));

// log server behaviour in terminal
app.use(morgan('dev'));

// parse http body so we can pass it as string??
app.use(bodyParser.urlencoded({ extended: false }));

// over write http method
app.use(methodOverride((req, res) => {
   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
     var method = req.body._method;
     delete req.body._method;
     return method;
   }})
 );

// tell express that we are using pug as view engine.
app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.redirect('/bulletins');
});

app.use('/bulletins', bulletinsRouter);

sequelize.sync().then(() => {
  console.log('Connected to db');
  app.listen(3001, () => {
    console.log('Web Server is running on port 3001');
  });
});
