const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;

const schema = new Schema({
    Diller:{
        type:String,
        required:true
    },
    Mail_Retail:{
        type:String,
        required:true
    },
    Address_Retail:{
        type:String,
        required:true
    },
    Code_Retail:{
        type:String,
        required:true
    }
})

module.exports = Mongoose.model('Retail', schema)