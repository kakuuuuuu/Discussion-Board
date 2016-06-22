var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AnswerSchema = new mongoose.Schema({
  text: {type: String, required: [true, 'Answer field cannot be empty'], minlength: [10, 'Answer must be at least 10 characters']},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
  _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  likes: {type: Number, required: true},
  dislikes: {type: Number, required: true}
})
mongoose.model('Answer', AnswerSchema);
