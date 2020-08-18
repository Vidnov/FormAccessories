var express = require("express");
var router = express.Router();
const multer = require("multer");
const Users = require("../model/Users");
const CreateMail = require("../controllers/CreateMail");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    console.log(file.originalname);
    return file.originalname;
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), function (req, res, next) {
  let filedata = req.file;

  if (!filedata) {
    next();
    console.log("Ошибка при загрузке файла");
    res.send("Ошибка загрузки файла!");
  } else {
    next();
    console.log("Файл загружен");
  }
});

router.post("/", async (req, res) => {
  const {
    Image_Name,
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
        Image_Name: Image_Name,
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
        CreateMail(
          "gmail",
          "nvidnov@gmail.com",
          "UFhybr419153!@",
          Mail,
          Sender,
          Priority_Request,
          Text_Request
        );
        res.status(201).end("Ваша заявка успешно создана!");
      });
    })
    .catch((err) => {
      res.status(400).end("Произошла ошибка!");
      console.error(err);
    });
});

module.exports = router;
