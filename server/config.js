const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:419153@main-ztx6n.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(err){
        return console.log(err);  
    }
})
.then(r=>console.log("Подключение к базе данных MongoDB прошло успешно "))
.catch(e=>console.error(e))


module.exports={}