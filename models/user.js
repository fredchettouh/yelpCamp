var mongoose = require('mongoose'),
    passportLocalMongoose=require('passport-local-mongoose');

var userSchema=new mongoose.Schema({
    username:String,
    password:String,
});
// this gives methods to the user object
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',userSchema);