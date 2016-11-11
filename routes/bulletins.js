const express = require('express'),
      Sequelize = require('sequelize'),
      router = express.Router();

const sequelize = new Sequelize('wille', 'wille', '', { dialect: 'postgres' });

// Model
var Bulletin = sequelize.define('bulletin', {
  title: Sequelize.STRING,
  message: Sequelize.TEXT
});

// Setting index pug to root
router.get('/', (request, response) =>{
  Bulletin.findAll({ order: 'id ASC' }).then((bulletin) => {
    response.render('bulletins/index', { bulletins: bulletin });
  });
});

// Create new bulletin function
router.post('/', (request, response) => {
  if (request.body.title) {
    Bulletin.create(request.body).then(() => {
      response.redirect('/bulletin');
    });
  } else {
    response.redirect('/bulletins/new');
  }
});

router.get('/new', (request, response) => {
  response.render('bulletins/new');
});

// Show view route
router.get('/:id', (request, response) => {
  Bulletin.findById(request.params.id).then((bulletin) => {
    response.render('bulletins/show', { bulletin: bulletin});
  });
});

router.put('/:id', (request, response) => {
  console.log(request.body);
  Bulletin.update(request.body, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/bulletin/' + request.params.id);
  });
});

module.exports = router;
