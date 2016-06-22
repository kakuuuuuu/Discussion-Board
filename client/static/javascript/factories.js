//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////User Factory///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
board_module.factory('userFactory', function($http, $location){
  var users = [];
  var factory = {};
  var errors = [];
  var currentUser = {};
  //sends error to controller
  factory.getErrors = function(){
    return errors;
  }
  //adds user to database
  factory.addUser = function(info){
    $http.post('/users', info).success(function($http){
      //if there are errors pushes errors to list
      if($http.errors){
        errors.push($http.errors)
      }
      //if no errors push data response to factory
      else{
        currentUser = $http;
        console.log('retrieved '+currentUser)
        localStorage.currentuser = JSON.stringify($http)
        console.log('storing into local storage: '+ JSON.parse(localStorage.currentuser).name)
        socket.emit('name_submitted', $http)
        users.push($http);
        errors.pop();
        $location.url('/dashboard');
      }
    })
  }
  //gets single user based on id parameters
  factory.getUser = function(id, callback){
    $http.get('/users/'+id).success(function(output){
      user = output;
      callback(user);
    })
  }
  return factory;
})
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Topic Factory//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
board_module.factory('topicFactory', function($http){
  var topics = [];
  var factory = {};
  var errors = [];
  //gets all topics to display
  factory.index = function(callback){
    $http.get('/topics').success(function(output){
      topics = output;
      callback(topics);
    })
  }
  //sends errors to controller
  factory.getErrors = function(){
    return errors;
  }
  //gets single topic to display
  factory.getTopic = function(id, callback){
    $http.get('/topic/'+id).success(function(output){
      topic = output;
      callback(topic);
    })
  }
  //adds topic to database
  factory.addTopic = function(info, user){
    $http.post('/topics', info).success(function($http){
      //if errors push errors to list
      if($http.errors){
        console.log($http.errors)
        errors.push($http.errors)
      }
      //if no errors push response to factory
      else{
        $http._user=user
        topics.push($http);
        errors.pop();
      }
    })
  }
  //adds answer to database
  factory.addAnswer = function(info, topic, user, callback){
    $http.post('/answers', info).success(function($http){
      if($http){
        if($http.error){
          console.log($http.error)
          errors.push({answer:$http.error})
        }
        else{
          $http._user = user;
          topic._answers.push($http);
          errors.pop();
          callback(topic);
        }
      }
    })
  }
  //adds comment to database
  factory.addComment = function(info, answer){
    $http.post('/comments', info).success(function($http){
      if($http.error){
        answer.error=$http.error
      }
      else{
        answer.error = null
        answer._comments.push(info)
      }
    })
  }
  //adds like to answer
  factory.addLike = function(info, answer){
    $http.post('/likes', info).success(function($http){
      if($http.error){
        console.log($http.error)
      }
      else{
        answer.likes++
      }
    })
  }
  //adds dislike to answer
  factory.addDislike = function(info, answer){
    $http.post('/dislikes', info).success(function($http){
      if($http.error){
        console.log($http.error)
      }
      else{
        answer.dislikes++
      }
    })
  }
  return factory;
})
