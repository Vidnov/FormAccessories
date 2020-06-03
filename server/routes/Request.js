var express = require("express");
var router = express.Router();
const Users = require("../model/Users");
router.get("/allrequest", (req, res) => {
  Users.find().then((r) => {
    res.send(r);
  });
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
