var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');
var Comment = mongoose.model('Comment');

module.exports = {
  index: function(req, res){
    Topic.find({}).populate('_user')
      .exec(function(err, topics){
        if(err){
          res.json(err);
        }
        else{
          res.json(topics);
        }
      })
  },
  showOne: function(req, res){
    Topic.find({_id:req.params.id})
      .populate({
        path:'_answers _user',
        populate: {
          path:'_comments _user',
          populate: {
            path:'_user',
            model:'User'
          }
        },
      }).exec(function(err, topic){
        console.log(topic[0]._answers[0])
        if(err){
          res.json({error: err})
        }
        else{
          res.json(topic);
        }
      })
  },
  create: function(req, res){
    console.log(req.body._user)
    User.findOne({_id:req.body._user}, function(err, user){
      var topic = new Topic(req.body);
      topic.save(function(err){
        if(err){
          res.json(err)
        }
        else{
          user._topics.push(topic);
          user.save(function(err){
            if(err){
              res.json(err)
            }
            else{
              console.log(topic)
              res.json(topic)
            }
          })
        }
      })
    })
  },
  addLike: function(req, res){
    if (req.body.user._id==req.body.answer._user._id){
      res.json({error: 'Cannot like your own answer'})
    }
    else{
      User.findOne({_id:req.body.user._id}, function(err, user){
        var check=false
        console.log(user.likes)
        console.log(req.body.answer._id)
        for(var x in user.likes){
          if(user.likes[x]==req.body.answer._id){
            console.log('already liked')
            var check=true
          }
        }
        if(check==true){
          res.json({error: 'already liked'})
        }
        else{
          user.likes.push(req.body.answer._id)
          user.save(function(err){})
          Answer.findOne({_id:req.body.answer._id}, function(err, answer){
            answer.likes++
            answer.save(function(err){
              res.json({success:'LIKED'})
            })
          })

        }
      })
    }
  },
  addDislike: function(req, res){
    if (req.body.user._id==req.body.answer._user._id){
      res.json({error: 'Cannot dislike your own answer'})
    }
    else{
      User.findOne({_id:req.body.user._id}, function(err, user){
        var check=false
        console.log(user.dislikes)
        console.log(req.body.answer._id)
        for(var x in user.dislikes){
          if(user.dislikes[x]==req.body.answer._id){
            console.log('already disliked')
            var check=true
          }
        }
        if(check==true){
          res.json({error: 'Already disliked'})
        }
        else{
          user.dislikes.push(req.body.answer._id)
          user.save(function(err){})
          Answer.findOne({_id:req.body.answer._id}, function(err, answer){
            answer.dislikes++
            answer.save(function(err){
              res.json({success:'LIKED'})
            })
          })

        }
      })
    }
  },
  createAnswer: function(req, res){
    User.findOne({_id:req.body._user._id}, function(err, user){
      if(err){
        console.log(err)
        res.json({error:err})
      }
      else{
        Topic.findOne({_id:req.body._topic}, function(err, topic){
          if(err){
            console.log(err)
            res.json({error:err})
          }
          else{
            var answer = new Answer(req.body);
            answer.save(function(err){
              if(err){
                console.log(err)
                res.json({error:err})
              }
              else{
                user._answers.push(answer);
                user.save(function(err){
                  if(err){
                    console.log(err)
                    res.json({error:err})
                  }
                  else{
                    topic._answers.push(answer);
                    topic.save(function(err){
                      if(err){
                        console.log(err)
                        res.json({error:err})
                      }
                      else{
                        console.log('answer is '+ answer)
                        res.json(answer);
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },
  createComment: function(req, res){
    User.findOne({_id:req.body._user._id}, function(err, user){
      if(err){
        console.log(err)
        res.json({error:err})
      }
      else{
        Answer.findOne({_id:req.body._answer}, function(err, answer){
          if(err){
            console.log(err)
            res.json({error:err})
          }
          else{
            var comment = new Comment(req.body);
            comment.save(function(err){
              if(err){
                console.log(err)
                res.json({error:err})
              }
              else{
                user._comments.push(comment);
                user.save(function(err){
                  if(err){
                    console.log(err)
                    res.json({error:err})
                  }
                  else{
                    answer._comments.push(comment);
                    answer.save(function(err){
                      if(err){
                        console.log(err)
                        res.json({error:err})
                      }
                      else{
                        res.json(comment);
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },
}
