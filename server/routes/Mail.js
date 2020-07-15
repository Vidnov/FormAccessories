var express = require('express');
var router = express.Router();  
const multer  = require("multer");  
const Users = require("../model/Users");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    console.log('!!!', file);
    const ext = file.originalname.split('.').reverse()[0];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  }
})

const upload = multer({ storage: storage })

router.post("/upload", upload.single("file"), function (req, res, next) {
    
     console.log('!!!', req.file);
     
      
      let filedata = req.file;
   
      if(!filedata)
          res.send("Ошибка при загрузке файла");
      else
          res.send("Файл загружен");
  });
  

router.post("/", async (req, res) => {
    // let testEmailAccount = await nodemailer.createTransport();
    const {
      Priority_Request,
      Sender,
      Id_TeamWeaver,
      Mail,
      Theme_Request,
      Text_Request,
      Image
    } = req.body;
    console.log('123',req.body)
    Users.findOne({ Mail: Mail })
      .then((result) => {
        result.Request.push({
          Priority_Request: Priority_Request,
          Id_TeamWeaver: Id_TeamWeaver,
          Sender: Sender,
          Recipient: Mail,
          Theme_Request: Theme_Request,
          Text_Request: Text_Request,
        });
        result.save(function (err, doc) {
          if (err) {
            res.sendStatus(500).end("Внутрення ошибка сервера");
            return console.error(err);
          }
          res.status(201).end("Ваша заявка успешно создана!");
        });
      })
      .catch((err) => {
        res.status(400).end("Произошла ошибка!");
        console.error(err);
      });
  
    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "nvidnov",
    //     pass: "UFhybr419153!@",
    //   },
    // });
  
    // let result = await transporter.sendMail({
    //   from: '"Node js" nodejs@example.com',
    //   to: req.body.recipient,
    //   subject:
    //     "Новая заявка! " + req.body.subject + " Приоритет:" + req.body.priority,
    //   text:
    //     "К вам поступило  новое обращение! \n" +
    //     "Заявитель:" +
    //     req.body.tt +
    //     "\n" +
    //     "Текст Обращения: " +
    //     req.body.text,
    // });
  
    // console.log(result);
    // res.setHeader("access-control-allow-origin", `http://localhost:8080`);
    // res.status(200).send("сообщение отправлено");
  });
  

module.exports = router;