var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name field cannot be empty'], minlength: [3, 'Name must be at least 3 characters']},
  _topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
  _answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  likes: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  dislikes: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
})
mongoose.model('User', UserSchema);
