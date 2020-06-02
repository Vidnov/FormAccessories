const express = require("express");
const app = express();
const path = require("path");
const data = require("./public/base.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const config = require("./config");
const Users = require("./model/Users");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res, next) => {
  var options = {
    root: path.join(__dirname, "public"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  var fileName = "base.json";
  res.setHeader("access-control-allow-origin", `http://localhost:8080`);
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
      console.log("Data:", data);
    }
  });
});

app.post("/send", (req, res) => {
  data.phones.forEach((element) => {
    if (element.model == req.body.model) {
      element.model_phone.forEach((e) => {
        if (e.mark == req.body.mark) {
          e.model = element.model;
          res.setHeader("access-control-allow-origin", `http://localhost:8080`);
          res.status(200).send(e);
        }
      });
    }
  });
});
app.post("/getmark", (req, res) => {
  data.phones.forEach((element) => {
    if (element.model == req.body.model) {
      var mark = [];
      element.model_phone.forEach((phone, i) => {
        mark.push(phone.mark);
        if (i == element.model_phone.length - 1) {
          res.setHeader("access-control-allow-origin", `http://localhost:8080`);
          res.status(200).send(mark);
        }
      });
    }
  });
});

app.post("/mail", async (req, res) => {
  // let testEmailAccount = await nodemailer.createTransport();
  console.log(req.body);
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

app.post("/createuser", (req, res) => {
  const {
    first_name,
    last_name,
    middle_name,
    email,
    password,
    admin,
  } = req.body.body;
  Users.findOne({ Mail: email }, (err) => {
    if (err) return console.log(err);
  })
    .then((result) => {
      console.log("В базе нашлось", result);
      if (result == null) {
        Users.create({
          First_Name: first_name,
          Last_Name: last_name,
          Middle_Name: middle_name,
          Mail: email,
          Password: password,
          Role: admin,
        })
          .then((result) => {
            res.send("Пользователь успешно создан");
            console.log("Пользователь успешно создан");
          })
          .catch((e) => {
            console.error(
              "При попытке создать пользователя произошла ошибка",
              e
            );
            res.send("При попытке создать пользователя произошла ошибка");
          });
      } else {
        console.log(
          "Пользователь с почтовым ящиком " + email + " уже существует"
        );
        res.send("Пользователь с почтовым ящиком " + email + " уже существует");
      }
    })
    .catch((e) => {
      console.error(
        "При попытке найти  данного  пользователя произошла ошибка",
        e
      );
      res.send("При попытке найти  данного  пользователя произошла ошибка");
    });
});

app.get("/getlistusers", (req, res) => {
  Users.find({})
    .then((result_list_users) => {
      res.send(result_list_users);
    })
    .catch((err) => {
      console.error("Ошибка получения списка пользователей", err);
      res.send("Ошибка получения списка пользователей");
    });
});

app.post("/deliteuser", (req, res) => {
  Users.deleteOne({ _id: req.body.id }, (err) => {
    if (err) {
      console.log(err);
    }
  }).then((result) => {
    Users.find({}).then((result) => res.send(result));
    console.log(result);
  });
});

app.get("/getrequest", (req, res) => {
  Users.find().then((r) => {
    res.send(r);
  });
});

app.get("/request/:_id", (req, res) => {
  const id = req.params._id;
  const Requesst = Users.find({ "Request._id": id })
    .then((result) => {
      return result.forEach((element) => {
        return element.Request.forEach((elementRequest) => {
          if (elementRequest._id == id) {
            res.status(200).send(elementRequest);
          }
        });
      });
    })
    .catch((e) => {
      res.status(404).send('Простите... Видимо такой заявки не существует')
      console.log(e)});
  
});
app.listen(3000);
