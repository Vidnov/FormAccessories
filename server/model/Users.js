const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;

const schema = new Schema({
    First_Name:{
        type:String,
        required: true,
    },
    Last_Name:{
        type:String,
        required: true,
    },
    Middle_Name:{
        type:String,
        required: true,
    },
    Mail:{
        type:String,
        required: true,
    },
    Password:{
        type:String,
        required: true,
    },
    Role:{
        type:Boolean,
        required:true,
        default:false,
    },
    Request:[
        {
            Priority_Request:{
                type:String,
                required:true
            },
            Id_TeamWeaver:{
                type:Number,
                required:true
            },
            Sender:{
                type:String,
                required:true,
            },

            Recipient:{
                type:String,
                required:true
            },
            Theme_Request:{
                type:String,
                required:true
            },
            Text_Request:{
                type:String,
                required:true
            },
            Date_Request:{
                type:Date,
                default:Date.now()
            }
        }
    ]

})

module.exports = Mongoose.model('Users', schema)