var express = require("express");
var router = express.Router();
const Users = require("../model/Users");

router.get("/allrequest", (req, res) => {
  Users.find().then((r) => {
    res.send(r);
  });
});
router.post("/delete/:_id", (req, res) => {
  const id = req.body.body;
  console.log(id)
  Users.findOne({ "Request._id": id })
    .then((result) => {
      result.Request.forEach((el,index) => {
        if(el._id==id){
          console.log(result.Request[index]) 
          result.Request.splice(index,1)
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
