const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  google_id: {type: String},
  username: {type: String},
  email: {type: String},
  image: {type: String},
  last_used_at: {type: Date},
});

module.exports = mongoose.model('Users', UserSchema);
