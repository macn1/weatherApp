const mongoose = require('mongoose')


const weatherSchema = new mongoose.Schema({

    temp:{
        type:String,
        required:true
    },
    feelsLike:{
        type:String,
        required:true
    },
    weatherD:{
        type:String,
        required:true
    },
    weatherCode:{
        type:String,
        required:true
    },
    
    city1:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})


const weatherModdel = mongoose.model('weatherModel',weatherSchema)

module.exports = weatherModdel