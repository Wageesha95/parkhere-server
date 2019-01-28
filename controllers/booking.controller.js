const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const nodemailer=require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//const Blog = require('../models/Post');
//const files=mongoose.model('files');
//const User = mongoose.model('webUser'); 
// const User=require('../models/user.model');
const Keeper = mongoose.model('park');
const booking=mongoose.model('booking');
const history=mongoose.model('history');

module.exports.bookingDetails = (req, res, next) =>{console.log('aghkbadhfb');
    booking.find({ slotId: req.params.slotId },
        (err, record) => {
            if (!record){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{console.log('Im in backend');
                // return res.status(200).json({ status: true, record:record})
                return res.send(record);
                ;}
        }
    );
}

module.exports.booking = (req, res, next) =>{console.log('aghkbadhfb');
    booking.find({keeperId:req.params.id},
        (err, record) => {
            if (!record){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{console.log('Im in backend');
                // return res.status(200).json({ status: true, record:record})
                return res.send(record);
                ;}
        }
    );
}

module.exports.bookinhistory=(req, res, next) =>{console.log('aghkbadhfb');
history.find({keeperId:req.params.id},
    (err, record) => {
        if (!record){
            return res.status(404).json({ status: false, message: 'User record not found.' });
        console.log(err)}
            else{console.log('Im in backend');
            // return res.status(200).json({ status: true, record:record})
            return res.send(record);
            ;}
    }
);
}

module.exports.setBook =  (req,res,next)=>{

  let  newbook=new booking(req.body);
//   this.newbook.bookId=Date.now();
var date=new Date().getTime()
newbook.bookId=date;
console.log(date)
  newbook.save((err)=>{
    if(err){
        res.json({sucsess:false,message:err})
    }
    else{
        res.json({sucsess:true,message:"Success booking"})
    }
}) 

}

module.exports.deleteBook=(req,res,next)=>{
    booking.deleteOne({bookId:req.params.bookId},
        (err,doc)=>{
            if(err){
              return  res.json({sucsess:false,message:err})
            }
            else{
                res.json({sucsess:true,message:"Delete success"})
            }
        }
    )
}

module.exports.sethistory =  (req,res,next)=>{

    let  newhistory=new history(req.body);
  //   this.newbook.bookId=Date.now();
  console.log(req.body)
    Keeper.updateOne(
        {
          _id: req.body.keeperId,
          type2: { $elemMatch: { slotId:req.body.slotId } }
        },
        { $set: { 
            "type2.$.isBook" : true,
            "type2.$.name" : req.body.DriverName,   
            "type2.$.nic" : req.body.DriverId,  
            "type2.$.parkedAt" : req.body.arivalTime,   
            "type2.$.leavAt" : req.body.depatureTime, 
            "type2.$.charge":req.body.charge          
    } },
    function(err,doc){
        if(err){console.log(err)
            // res.json({sucsess:false,message:err})
        }else{
            console.log(doc)
        }
    }
     )
  
    newhistory.save((err)=>{
      if(err){
          res.json({sucsess:false,message:err})
      }
      else{
          res.json({sucsess:true,message:"Saved"})
      }
  }) 
  
  }

  module.exports.releaseslot=(req,res,next)=>{
    Keeper.updateOne(
        {
          _id: req.body.keeperId,
          type2: { $elemMatch: { slotId:req.body.slotId } }
        },
        { $set: { 
            "type2.$.isBook" : false,
            "type2.$.name" : '',   
            "type2.$.nic" :'',  
            "type2.$.parkedAt" :'',   
            "type2.$.leavAt" :'',           
    } },
    function(err,doc){
        if(err){console.log(err)
            // res.json({sucsess:false,message:err})
        }else{
            // res.json({sucsess:true,message:doc})
        }
    }
     )

     Keeper.findOne({_id:req.body.keeperId}).select().exec((err,user)=>{
        let charge=user.monthrev;
        console.log(charge)
        console.log(req.body.charge)
        user.monthrev=(charge+req.body.charge);console.log(user)
        user.save((err)=>{
            if(err){
                res.json({sucsess:false,message:err})
            }
            else{
                res.json({sucsess:true,message:'Charge recoded'});
            }
        })
     })
  }

  module.exports.getBookedSlots =  (req,res)=>{
    //var keeperId = req.query.kid;
    let arrival = parseFloat(req.query.arrival);
    let dep = parseFloat(req.query.dep);

    console.log(req.query.kid);
    console.log(req.query.type);
    console.log(req.query.arrival);
    console.log(req.query.dep);
    console.log(req.query.date);

    booking.find({
            keeperId:req.query.kid,
            vehicleType:req.query.type,
            $and: [{ depatureTime: {$gt:parseFloat(req.query.arrival)}},{ arivalTime: {$lt:parseFloat(req.query.dep)}}],
            date:req.query.date
        },
        (err, booking) => {
            if (!booking || booking.length==0){
                //res.status(404).json({ status: false, message: 'User record not found.' });
                res.json({
                    takenCount : 0,
                    bookings : []
                });
                console.log(err)
            }else{
                console.log('Im in backend');
                // return res.status(200).json({ status: true, record:record})
                
                var arr = [];
                var arr2 = [];
                booking.forEach(element => {
                    var obj = new Object();
                    obj.slotNum = element.slotNum;
                    obj.slotId = element.slotId;
                    arr.push(obj);
                    //arr2.push(element.slotId);
                });
                res.json({
                    takenCount : booking.length,
                    bookings : arr
                });
            }
        }
    );
    //res.json({sucsess:true,message:"Success booking "+req.query.kid});
}
const Park = mongoose.model('park');

module.exports.getSlotId = (req,res)=>{
    Park.findOne({
        keeperId:req.query.keeperId
    }
    , function(err, park) 
    {
       if (err)
       {
           res.send(err);
       }
       console.log(user);
       var c = req.query.type;

       switch (c){
            case 1:
                res.json(park.type1);
                break;
            case 2:
                res.json(park.type2);
                break;
            case 3:
                res.json(park.type3);
                break;
            case 4:
                res.json(park.type4);
                break;
            case 5:
                res.json(park.type5);
                break;
       }
       
   
    });
}