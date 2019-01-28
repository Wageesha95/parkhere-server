const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    senderEmail:{type:String},
    receiverId:{type:String},
    parkName:{type:String},
    comment:{type:String}
});

mongoose.model('feedback', userSchema);