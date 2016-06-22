var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TopicSchema = new mongoose.Schema({
  topic: {type: String, required: [true, 'Topic field cannot be empty'], minlength: [3, 'Topic must be at least 3 characters']},
  description: {type: String, required: [true, 'Description field cannot be empty'], minlength: [10, 'Description must be at least 10 characters']},
  category: {type: String, required: [true, 'Topic must have a category']},
  _user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Topic must have a user']},
  _answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
})
mongoose.model('Topic', TopicSchema);
