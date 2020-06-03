var express = require('express');
var router = express.Router();  
const data = require("../public/base.json");
router.post("/", (req, res) => {
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

module.exports = router;