var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
require('./server/config/mongoose.js');

app.use(bodyParser.json());

app.use(express.static(__dirname + "/client/static"))
// app.set('views', path.join(__dirname,'./client/static'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs')
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

var server = app.listen(8000,function(){
  console.log('Listening on port 8000')
})

var names = []
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
  console.log(socket.id);
  console.log(names)

  socket.on('name_submitted', function(data){
    var check=false
    for(var x in names){
      if(names[x].name==data.name){
        check=true;
      }
    }
    if(check == false){
      names.push({name:data.name, id:data._id});
      console.log(names)
      io.emit('names',data)
    }
  })
  socket.on('ask', function(){
    socket.emit('init', names)
  })
  socket.on('logout', function(name){
    console.log(name)
    var index = -1;
    console.log('removing')
    for(var x in names){
      if(names[x].name==name){
        index= x;
        break
      }
    }
    if(index!=-1){
      names.splice(index,1)
      io.emit('remove', names)
    }
    console.log(names)
  })
})
