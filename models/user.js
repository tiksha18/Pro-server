const mongoose = require("mongoose");
// const { DB_LINK } = require("../config/secrets.js");

mongoose.connect( 'mongodb+srv://cowinuserdb:sdWX8t9GgzRVsD6b@cluster0.nkaqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    console.log("connected to db");
})

let userSchema = new mongoose.Schema({
    name: {
      type: String,
      //required: true
    },
    email: { 
      type: String,
    //   required: true,
    //   //unique: true,
    lowercase: true,
    trim : true
    },
    password: {
      type: String,
      //required: true,
      //unique: true,
      minlength: [6, "Password must be more than 6 characters long"]
    }
}) 


const User = mongoose.model("userscollections", userSchema);

module.exports = User;