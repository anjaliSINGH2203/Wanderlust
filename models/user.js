const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
       }
});

userSchema.plugin(passportLocalMongoose);  //automatically adds hashing salting to our passwords

module.exports = mongoose.model('User', userSchema);                 //pbdk2 hashing algorithm is used here for password