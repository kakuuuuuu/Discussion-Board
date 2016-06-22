var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new mongoose.Schema({
  text: {type: String, required: [true, 'Comment field cannot be empty'], minlength: [10, 'Comment must be at least 10 characters']},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _answer: {type: Schema.Types.ObjectId, ref: 'Answer'},
})
mongoose.model('Comment', CommentSchema);
