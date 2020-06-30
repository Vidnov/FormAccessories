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
            Priority_Request:{  //Необходимо  изменить  на  тип String 
                type:Boolean,
                required:true,
                default:false
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
            },
            Date_execution:{
                type:Date,
                default:Date.now()
            },
            Status:{               
                type:String,
                default:'В работе'
            },
            Completion_date:{ // Дата планируемого выполнения 
                type:Date
            },
            Seen:{          // Просмотрена ли заявка
                type:Boolean,
                default:false
            },
            Image:{
                type:String
            },
            Comments:{
                type:String
            }
        }
    ]

})

module.exports = Mongoose.model('Users', schema)