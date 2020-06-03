var express = require('express');
var router = express.Router();  
const Users = require("../model/Users");


router.post("/deliteuser", (req, res) => {
  Users.deleteOne({ _id: req.body.id }, (err) => {
    if (err) {
      console.log(err);
    }
  }).then((result) => {
    Users.find({}).then((result) => res.send(result));
    console.log(result);
  });
});


router.get("/getlistusers", (req, res) => {
  Users.find({})
    .then((result_list_users) => {
      res.send(result_list_users);
    })
    .catch((err) => {
      console.error("Ошибка получения списка пользователей", err);
      res.send("Ошибка получения списка пользователей");
    });
});

router.post("/create", (req, res) => {
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
  
module.exports = router;