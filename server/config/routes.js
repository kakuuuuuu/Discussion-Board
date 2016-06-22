var users = require('../controllers/users.js');
var topics = require('../controllers/topics.js');

module.exports = function(app){
  app.post('/users', function(req, res){
    users.create(req, res);
  })
  app.get('/users/:id', function(req, res){
    console.log('here')
    users.showOne(req, res);
  })
  app.get('/topic/:id', function(req, res){
    topics.showOne(req, res);
  })
  app.get('/topics', function(req, res){
    topics.index(req, res);
  })
  app.post('/topics', function(req, res){
    topics.create(req, res);
  })
  app.post('/answers', function(req, res){
    topics.createAnswer(req, res);
  })
  app.post('/comments', function(req, res){
    topics.createComment(req, res);
  })
  app.post('/likes', function(req, res){
    topics.addLike(req, res);
  })
  app.post('/dislikes', function(req, res){
    topics.addDislike(req, res);
  })
}
