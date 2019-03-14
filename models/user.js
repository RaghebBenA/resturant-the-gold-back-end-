const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  admin: {
    type: Boolean,
    default: false
  }
});

//Adding based passport athentication
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
