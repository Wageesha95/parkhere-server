const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



//User Schema


const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },


    email:{
        type:String,
        required: true
    },


    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

    mobileNum:{
        type:String,
        required: true
    },

    NICnumber:{
        type:String,
        required: true
    },

    
    parkName:{
        type:String,
        required: true
    },

    
    numberOfSlots:{
        type:Number,
        required: true
    },
    
    openHours:{
        type:String,
        required: true
    },
    
    alocatedSlots1:{
        type:Number,
        required: true
    },
    type1:{type:Array,default:[]},
    hourCharge1:{
        type:String,
        required: true
    },

    alocatedSlots2:{
        type:Number,
        required: true
    },
    type2:{type:Array,default:[]},
    
    hourCharge2:{
        type:String,
        required: true
    },

    alocatedSlots3:{
        type:Number,
        required: true
    },
    type3:{type:Array,default:[]},
    hourCharge3:{
        type:String,
        required: true
    },

    alocatedSlots4:{
        type:Number,
        required: true
    },
    type4:{type:Array,default:[]},
    hourCharge4:{
        type:String,
        required: true
    },

    alocatedSlots5:{
        type:Number,
        required: true
    },
    type5:{type:Array,default:[]},
    hourCharge5:{
        type:String,
        required: true
    },

    MaximumWeight:{
        type:String,
        required: true
    },

    MaximumHeight:{
        type:String,
        required: true
    },
role:{
    type:String,
    default:"keeper"
}
    

});


const User =module.exports = mongoose.model('park',UserSchema);


module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByEmail = function(email,callback){console.log(email)
    const query ={email:email}
    User.findOne(query,callback);
}
UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err,hash)=>{
        if(err) throw err;
        newUser.password = hash;console.log(newUser)
        newUser.save(callback);
        });
    });
}


module.exports.comparePassword = function(candidatePassword, hash ,callback){
    bcrypt.compare(candidatePassword, hash, (err,isMatch)=>{
        if(err)throw err;
        callback(null,isMatch);
    });
}
