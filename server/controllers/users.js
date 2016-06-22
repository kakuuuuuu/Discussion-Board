var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
  create: function(req, res){
    User.findOne({name:req.body.name},function(err, user){
      if(err){
        res.json(err)
      }
      else if(user){
        res.json(user)
      }
      else{
        var user = new User(req.body)
        user.save(function(err){
          if(err){
            console.log(err)
            res.json(err)
          }
          else{
            res.json(user)
          }
        })
      }
    })
  },
  showOne: function(req, res){
    User.findOne({_id:req.params.id}, function(err, user){
      if(err){
        res.json(err)
      }
      else{
        res.json(user)
      }
    })
  },
}
