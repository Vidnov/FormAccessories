const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:419153@main-ztx6n.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(err){
        return console.log(err);  
    }
    else return console.log('База данных подключена!')
})
.catch(e=>console.error(e))


module.exports={}