var express = require("express");
var router = express.Router();
const Users = require("../model/Users");
const { request } = require("express");

router.post("/get_user_request", (req, res) => {
  console.log(req.body)
  Users.find({ Mail: req.body.user })
    .then((result) => {
      if (result == "") {
        console.log("я ничего не получил");
        res.status(404).send("Ошибка! не смогли найти такого пользователя");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((e) => {
      res.status(404).send("Ошибка! не смогли найти такого пользователя");
    });
});

router.post("/request_update_date", (req, res) => {

  const { id, date } = req.body
  Users.findOne({ "Request._id": id })
    .then(
      result => {
        result.Request.forEach(element => {
          if (element._id == id) {
            element.Date_execution = date
          }
        });
        result.save(function (err, doc) {
          if (err) {
            res.sendStatus(500).end("Внутрення ошибка сервера");
            return console.error(err);
          }
          Users.findOne({ "Request._id": id }).then((r) => {
            res.status(200).send('Запрос обработан успешно');
          });
        });
      },
    )
    .catch(err => {
      res.sendStatus(500).end("Внутрення ошибка сервера",err);
    })

})

router.get("/allrequest", (req, res) => {
  Users.find()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => console.error(e));
});
router.post("/delete/:_id", (req, res) => {
  const id = req.body.body;

  Users.findOne({ "Request._id": id })
    .then((result) => {
      result.Request.forEach((el, index) => {
        if (el._id == id) {
          result.Request.splice(index, 1);
        }
      });
      result.save(function (err, doc) {
        if (err) {
          res.sendStatus(500).end("Внутрення ошибка сервера");
          return console.error(err);
        }
        Users.find().then((r) => {
          res.status(200).send(r);
        });
      });
    })
    .catch((e) => console.error(e));
});

router.get("/:_id", (req, res) => {
  const id = req.params._id;
  Users.find({ "Request._id": id })
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
      res.status(404).send("Простите... Видимо такой заявки не существует");
      console.log(e);
    });
});

module.exports = router;
