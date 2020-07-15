const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;

const schema = new Schema({
    First_Name:{
        type:String,
        required: false,
    },
    Last_Name:{
        type:String,
        required: false,
    },
    Middle_Name:{
        type:String,
        required: false
    },
    Mail:{
        type:String,
        required: false
    },
    Password:{
        type:String,
        required: false,
    },
    Role:{
        type:Boolean,
        required:false,
        default:false,
    },
    Request:[
        {
            Priority_Request:{  //Необходимо  изменить  на  тип String 
                type:Boolean,
                required:false,
                default:false
            },
            Id_TeamWeaver:{
                type:Number,
                required:false
            },
            Sender:{
                type:String,
                required:false,
            },

            Recipient:{
                type:String,
                required:false
            },
            Theme_Request:{
                type:String,
                required:false
            },
            Text_Request:{
                type:String,
                required:false
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