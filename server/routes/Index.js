var express = require('express');
var router = express.Router();
const path = require("path");
const data = require("../public/base.json");

router.get("/", (req, res, next) => {
    var options = {
      root: path.join(__dirname, "../public"),
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
      }
    });
  });

  module.exports = router;