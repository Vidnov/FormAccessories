const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;

const schema = new Schema({
    brand:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false
    }
})

module.exports = Mongoose.model('Retail', schema)