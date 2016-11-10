const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug');
      methodOverride = require('method-override');
      bodyParser = require('body-parser');
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('wille','wille', '', {dialect: 'postgres' });
