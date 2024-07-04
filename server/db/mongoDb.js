const mongoose = require('mongoose')



const connectDb = async()=>{


    mongoose.connect( 'mongodb+srv://athulmk:athulmk@cluster0.lsgsqfu.mongodb.net/weather?retryWrites=true&w=majority').then(()=>{
        console.log("db connected successfully");
    }).catch(()=>{
        console.log("db connection failed");
    })
}

module.exports = connectDb