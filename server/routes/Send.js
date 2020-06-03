var express = require('express');
var router = express.Router();  
const data = require("../public/base.json");

router.post("/", (req, res) => {
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


module.exports = router;