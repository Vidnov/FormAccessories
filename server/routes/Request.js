var express = require("express");
var router = express.Router();
const Users = require("../model/Users");
const Retails = require("../model/Retail");
const FindRequestById = require("../controllers/FindRequestById");
const CloseRequestMail = require("../controllers/CloseRequestMail");
const FindRetailByMail = require("../controllers/FindRetailByMail");
const SaveNewCommentsById = require("../controllers/SaveNewCommentsById");
//const EditStatusRequest = require("../controllers/EditStatusRequest");

router.post("/comment_applicant/:id", async (req, res) => {
  const { Id, Text_Comments } = req.body;
  const date = new Date();
  const Request = await FindRequestById(Id);
  const Address_Retail = Request.Address_Retail;

  SaveNewCommentsById(Id, Text_Comments, Address_Retail);
  //EditStatusRequest(Id);

  async function EditStatusRequest (id){
    const request = await   Users.findOne({ "Request._id": id })
    request.Request.forEach((request) => {
      if (request._id == id) {
        
        request.Status = "На Рассмотрении";
        
      }
    });
   await request.save()
   .catch(

   )
    console.log(request)
  }
  EditStatusRequest(Id)
  res.send("ok");
});
router.post("/get_request_user_close", (req, res) => {
  result_sort_request = [];
  const Mail = req.body.Mail;
  Users.find({ "Request.Seen": true, "Request.Status": "Закрыта", Mail: Mail })
    .then((result) => {
      if (result == "") {
        res.status(200).send("Завершенных заявок нет");
        console.log("Завершенных заявок нет");
      } else {
        result.forEach((res) => {
          res.Request.forEach((request) => {
            if ((request.Seen === true) & (request.Status == "Закрыта")) {
              result_sort_request.push(request);
            }
          });
        });
        result.forEach((el) => {
          el.Request = result_sort_request;
        });
        res.send(result);
      }
    })
    .catch((e) => {
      console.error(e);
      res.status(404).send("Ошибка! не смогли найти такого пользователя");
    });
});

router.post("/comments", (req, res) => {
  //создать комментарий
  const { Id, Comment, ImageName, Sender, Avatar_Sender } = req.body;
  const result = "";
  const err = "";
  Users.findOne({ "Request._id": Id })
    .then((result) => {
      result.Request.forEach((request) => {
        if (request._id == Id) {
          request.Comments_block.push({
            Text_Comments: Comment,
            Image_Name_Comments: ImageName,
            Sender_Comments: Sender,
          });
        }
      });
      result.save((e, doc) => {
        if (e) {
          const err = e;
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });

  FindRequestById(Id).then((result) => {
    res.send(result.Comments_block);
  });
});
router.get("/get_comment/:id", (req, res) => {
  const id = req.params.id;
  FindRequestById(id)
    .then((result) => {
      res.send(result.Comments_block);
    })
    .catch((e) => {
      console.error(e);
    });
});
router.post("/close_request", (req, res) => {
  const { Mail, id, Mail_Retail } = req.body;
  console.log(req.body);
  const result_sort_request = [];
  Users.findOne({ "Request._id": id })
    .then((result) => {
      result.Request.forEach((request) => {
        if (request._id == id) {
          request.Status = "Закрыта";
        }
      });
      result.save(function (err, doc) {
        if (err) {
          res.sendStatus(500).end("Внутрення ошибка сервера");
          console.log(err);
        }

        FindRetailByMail(Mail_Retail).then((Retail) => {
          console.log(Retail);
          CloseRequestMail(Retail.Mail_Retail, id);
        });

        Users.find({
          Mail: Mail,
          "Request.Seen": true,
          "Request.Status": "В работе",
        }).then((result) => {
          if (result == "") {
            res.status(200).send("Заявок в работе нет");
          } else {
            result.forEach((element) => {
              element.Request.forEach((request) => {
                if ((request.Seen == true) & (request.Status == "В работе")) {
                  result_sort_request.push(request);
                }
              });
              result.forEach((el) => {
                el.Request = result_sort_request;
              });

              res.status(200).send(result);
            });
          }
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/get_request_user_work", (req, res) => {
  result_sort_request = [];

  Users.find({
    Mail: req.body.user,
    "Request.Seen": true,
    "Request.Status": "В работе",
  })
    .then((result) => {
      if (result == "") {
        res.status(200).send("Заявок в работе нет");
        console.log("Заявок в работе нет");
      } else {
        result.forEach((element) => {
          element.Request.forEach((request) => {
            if ((request.Seen == true) & (request.Status == "В работе")) {
              result_sort_request.push(request);
            }
          });
          result.forEach((el) => {
            el.Request = result_sort_request;
          });
          res.status(200).send(result);
        });
      }
    })
    .catch((e) => {
      console.error(e);
      res.status(200).send("Ошибка! не смогли найти такого пользователя");
    });
});

router.post("/get_user_request_new", (req, res) => {
  result_sort_request = [];
  Users.find({
    Mail: req.body.user,
    "Request.Seen": false,
    "Request.Status": "На Рассмотрении",
  })
    .then((result) => {
      if (result == "") {
        res.status(200).send("Новых заявок нет");
      } else {
        result.forEach((element) => {
          element.Request.forEach((request) => {
            if (request.Seen == false) {
              result_sort_request.push(request);
            }
          });
        });
        result.forEach((el) => {
          el.Request = result_sort_request;
        });

        res.status(200).send(result);
      }
    })
    .catch((e) => {
      console.error(e);
      res.status(404).send("Ошибка! не смогли найти такого пользователя");
    });
});

router.post("/get_user_request", (req, res) => {
  // получить  все заявки
  Users.find({ Mail: req.body.user })
    .then((result) => {
      if (result == "") {
        res.status(200).send("Список заявок пуст!");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((e) => {
      res.status(200).send(e);
    });
});

router.post("/request_update_date", (req, res) => {
  const { id, date } = req.body;
  Users.findOne({ "Request._id": id })
    .then((result) => {
      result.Request.forEach((element) => {
        if (element._id == id) {
          element.Date_execution = date;
          element.Seen = true;
          element.Status = "В работе";
        }
      });
      result.save(function (err, doc) {
        if (err) {
          res.sendStatus(500).end("Внутрення ошибка сервера");
          return console.error(err);
        }
        Users.findOne({ "Request._id": id }).then((r) => {
          res.status(200).send("Запрос обработан успешно");
        });
      });
    })
    .catch((err) => {
      res.sendStatus(500).send("Внутрення ошибка сервера", err);
    });
});

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
          res.sendStatus(500).send("Внутрення ошибка сервера");
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
