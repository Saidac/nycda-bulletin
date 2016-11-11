const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug');
      methodOverride = require('method-override');
      bodyParser = require('body-parser');
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('wille','wille', '', {dialect: 'postgres' });


// var booksRouter = require('./routes/books');
//
// var Book = sequelize.define('book', {
//   title: Sequelize.STRING,
//   slug: Sequelize.STRING,
//   imageURL: Sequelize.STRING,
//   author: Sequelize.STRING,
//   description: Sequelize.TEXT
// });
//

//tell express to look for static files in public
app.use(express.static('public'));

// app.use(morgan('dev'));
//
// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.use(methodOverride((req, res) => {
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     var method = req.body._method;
//     delete req.body._method;
//     return method;
//   }})
// );

// tell express that we are using pug as view engine.
app.set('view engine', 'pug');

// Router that handl



// TO DO
//
// views/app.pug
// views/bulletins/index.pug
// views/bulletins/new.pug

// routes/bulletins.js



app.get('/', (request, response) => {
  response.redirect('/bulletins');
});

app.use('/books', booksRouter);


// set listening port for server 3002
// pack this thing in sequelize prototype wrapper.
app.listen(3002, () => {
  console.log('Web Server is running on port 3002');
});
