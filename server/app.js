const express = require('express');
const app = express()
const path = require('path')
const data = require('./public/base.json')
const bodyParser = require('body-parser')
const cors = require('cors')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res, next) => {
    var options = {
        root: path.join(__dirname, 'public'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    var fileName = 'base.json'
    res.setHeader('access-control-allow-origin', `http://localhost:8080`)
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
            console.log('Data:', data)
        }
    })
})
app.post('/send', (req, res) => {
 
    data.phones.forEach(element => {

        if (element.model == req.body.model) {
            element.model_phone.forEach(e => {
                if (e.mark == req.body.mark) {
                    e.model = element.model
                    res.setHeader('access-control-allow-origin', `http://localhost:8080`)
                    res.status(200).send(e);
                }
            })
        }
    });

})
app.post('/getmark', (req, res) => {
    data.phones.forEach(element => {
        if (element.model == req.body.model) {
           
            var mark=[]
                    element.model_phone.forEach((phone,i)=>{
                       mark.push(phone.mark)
                       if(i== element.model_phone.length-1){
                        res.setHeader('access-control-allow-origin', `http://localhost:8080`)      
                        res.status(200).send(mark)  
                       }
                    })
             

            
          
        }
    });

})

app.listen('3000', () => {
    console.log('server start')
})