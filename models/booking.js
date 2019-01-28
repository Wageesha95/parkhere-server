const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const booking = mongoose.Schema({
    vehicleNum:{
        type:String
        
    },

    DriverName:{
        type:String
    },

    ParkName:{
        type:String
    },

    lat:{
        type:Number
    },
    lng:{
        type:Number
    },

    paid:{
        type:Boolean
    },

    DriverEmail:{
        type:String
    },

    DriverId:{
        type: String
        
    },
    date:{
        type: String
        
    },

    arivalTime:{
        type:Number
        
    },

    depatureTime:{
        type:Number
        
    },

    
    vehicleType:{
        type:String
        
    },

    
    slotNum:{
        type:String
        
    },
    slotId:{
        type:String
    },
    bookId:{
        type:String
    },
    keeperId:{
        type:String
    },
    
    charge:{
        type:Number
    }
});


const Booking =module.exports = mongoose.model('booking',booking);