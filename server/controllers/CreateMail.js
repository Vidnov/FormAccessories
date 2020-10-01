const express = require("express");
const nodemailer = require("nodemailer");
// Оповещение о создании заявки
async function CreateMail(service,user,password,recipient,sender,priority,text){
//let testEmailAccount = await nodemailer.createTransport();
if(priority=='true')
priority="Срочно!"
else
priority=""
let transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: user,
      pass: password,
    },
  });

  let result = await transporter.sendMail({
    from: '"HelpDesk" support@sotiks.net',
    to: recipient,
    subject:
      "Новая заявка! "+priority,
    text:
      "К вам поступило  новое обращение! \n" +
      "Заявитель:" +sender+
      "\n" +
      "Текст Обращения: "+text,
  });

  console.log(result);
}
module.exports = CreateMail;