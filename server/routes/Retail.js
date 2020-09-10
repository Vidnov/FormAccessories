var express = require("express");
var router = express.Router();
const Retail = require("../model/Retail");
const Users = require("../model/Users");
const { request } = require("express");

router.post("/create", (req, res) => {
  const { Address_Retail, Code_Retail, Mail_Retail, Diller } = req.body;

  Retail.create({
    Address_Retail: Address_Retail,
    Code_Retail: Code_Retail,
    Mail_Retail: Mail_Retail,
    Diller: Diller,
  })
    .then((result) => {
      console.log("Создана новая точка");
      res.send(result);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.get("/allretail", (req, res) => {
  Retail.find({}).then((result) => {
    res.send(result);
  });
});
module.exports = router;
