var express = require("express");
var router = express.Router();
const multer = require("multer");
const Users = require("../model/Users");
const CreateMail = require ('../model/CreateMail')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    
    const ext = file.originalname.split(".").reverse()[0]; //формат
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
    return uniqueSuffix
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), function (req, res, next) {

  let filedata = req.file;

  if (!filedata) {
    next();
    console.log("Ошибка при загрузке файла");
  } else {
    next();
    console.log("Файл загружен");
  }
});

router.post("/", async (req, res) => {

  const {
    Priority_Request,
    Sender,
    Id_TeamWeaver,
    Mail,
    Theme_Request,
    Text_Request,
    Image,
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
});

module.exports = router;
