const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug');
      methodOverride = require('method-override');
      bodyParser = require('body-parser');
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('wille','wille', '', {dialect: 'postgres' });

// TO DO
//
// views/app.pug
// views/bulletins/index.pug
// views/bulletins/new.pug

// routes/bulletins.js




// set listening port for server 3002
// pack this thing in sequelize prototype wrapper.
app.listen(3002, () => {
  console.log('Web Server is running on port 3002');
});
