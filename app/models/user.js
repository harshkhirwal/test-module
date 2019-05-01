const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String
}, {
    "freezeTableName": true
  });



module.exports = mongoose.model('User', UserSchema);
