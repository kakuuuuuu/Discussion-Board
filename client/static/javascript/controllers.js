//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Login Controller///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
board_module.controller('usersController', function($scope, userFactory, $location){
  // logs user out
  if(localStorage.currentuser){
    socket.emit('logout', JSON.parse(localStorage.currentuser).name)
    delete localStorage['currentuser']
  }
  // adds user if name isn't already in database
  $scope.addUser = function(){
    userFactory.addUser($scope.newUser);
    $scope.newUser={};
    $scope.errors.pop();
  }
  // grabs errors from factory
  $scope.errors = userFactory.getErrors();
  console.log($scope.errors)
})
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Dashboard Controller///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
board_module.controller('dashboardController', function($scope, userFactory, topicFactory, $location){
  // check if user is logged in
  if("currentuser" in localStorage){
    //grabs current user from localStorage if logged in
    $scope.currentUser = JSON.parse(localStorage.currentuser)
  }
  else {
    //redirects if user is not logged in
   $location.url('/')
  }
  //grabs all topics
  $scope.topics = [];

  topicFactory.index(function(data){
    $scope.topics = data;
  })
  //on page load asks server for list of users logged in
  socket.emit('ask');
  $scope.users = [];
  //initializes list of users when data is recieved
  socket.on('init', function(data) {
    $scope.$apply(function(){
      $scope.users = data;
    })
  });
  //adds user to list of users when user logs in
  socket.on('names', function(data){
    $scope.$apply( function(){
      $scope.users.push({name:data.name, id:data._id});
      console.log('list '+$scope.users)
    })

  })
  //removes user from list when user logs out
  socket.on('remove', function(name){
    $scope.$apply( function(){
      console.log($scope.users)
      $scope.users.splice($scope.users.indexOf(name),1)
    })
  })
  //get errors
  $scope.errors = topicFactory.getErrors()
  //initializes categories for topics
  $scope.categories = [{name:'HTML'},{name:'CSS'},{name:'Javascript'},{name:'Python'},{name:'Pylot'},{name:'Django'},{name:'Ruby'},{name:'Rails'},{name:'Node.js'},{name:'Express.js'},{name:'Angular.js'},{name:'MySQL'},{name:'MongoDB'}];
  //sets first item for select tag
  $scope.selectedCategory = $scope.categories[0];
  //prepares topic to be added to database
  $scope.newTopic = {};
  $scope.addTopic = function(){
    $scope.newTopic.category = $scope.selectedCategory.name
    $scope.selectedCategory = $scope.categories[0];
    $scope.newTopic._user = $scope.currentUser._id
    $scope.newTopic._answers=[];
    topicFactory.addTopic($scope.newTopic, $scope.currentUser);
    $scope.newTopic = {};
  }
})
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Topic Controller///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
board_module.controller('topicsController', function($scope, userFactory, topicFactory, $routeParams, $location){
  //checks if user is logged in
  if("currentuser" in localStorage){
    //grabs current user from localStorage if logged in
    $scope.currentUser = JSON.parse(localStorage.currentuser);
  }
  else {
    //redirects if user is not logged in
    $location.url('/')
  }
  //grabs id from url
  var id = $routeParams.id;
  //grabs topic based on id from url
  $scope.topic = {};
  topicFactory.getTopic(id, function(data){
    $scope.topic = data;
  })
  //grabs errors
  $scope.errors = topicFactory.getErrors();
  console.log($scope.errors)
  //prepares answer to be added to db
  $scope.newAnswer = {};
  $scope.addAnswer = function(){
    $scope.newAnswer._user=$scope.currentUser
    $scope.newAnswer._topic = id;
    $scope.newAnswer_comments = [];
    $scope.newAnswer.likes = 0;
    $scope.newAnswer.dislikes = 0;
    topicFactory.addAnswer($scope.newAnswer, $scope.topic[0], $scope.currentUser, function(data){
      $scope.topic[0]=data;
    })
    $scope.newAnswer = {};
    $scope.errors.pop();
  }
  //prepares comment to be added to db
  $scope.newComment = {};
  $scope.addComment = function(answer){
    if(answer.newComment == undefined){
      answer.newComment = {}
    }
    $scope.newComment._user=$scope.currentUser;
    $scope.newComment._answer=answer._id
    $scope.newComment.text=answer.newComment.text
    topicFactory.addComment($scope.newComment, answer)
    answer.newComment = {};
    $scope.newComment = {};
    $scope.errors.pop();
  }
  //adds like
  $scope.like = function(answer){
    console.log('liking '+ answer._id)
    topicFactory.addLike({answer:answer, user:$scope.currentUser}, answer)
  }
  //adds dislike
  $scope.dislike = function(answer){
    console.log('disliking '+ answer._id)
    topicFactory.addDislike({answer:answer, user:$scope.currentUser}, answer)
  }
})
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Userpage Controller////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
board_module.controller('userpageController', function($scope, userFactory, $routeParams, $location){
  //checks if user is logged in
  if("currentuser" in localStorage){
  }
  else {
   $location.url('/')
  }
  //grabs id from url
  var id = $routeParams.id;
  //grabs user based on id from url
  $scope.user = {};
  userFactory.getUser(id, function(data){
    $scope.user = data;
    console.log($scope.user);
  })
})
