var express = require('express');
var router = express.Router();  
const Users = require("../model/Users");

router.post("/", async (req, res) => {
    // let testEmailAccount = await nodemailer.createTransport();
    const {
      Priority_Request,
      Sender,
      Id_TeamWeaver,
      Mail,
      Theme_Request,
      Text_Request,
    } = req.body;
  
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