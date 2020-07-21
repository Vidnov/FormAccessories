const express = require("express");
const nodemailer = require("nodemailer");

async function CreateMail(service,user,password,recipient,sender,priority,text){
//let testEmailAccount = await nodemailer.createTransport();
let transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: user,
      pass: password,
    },
  });

  let result = await transporter.sendMail({
    from: '"Node js" nodejs@example.com',
    to: recipient,
    subject:
      "Новая заявка! " + req.body.subject + " Приоритет:" + priority,
    text:
      "К вам поступило  новое обращение! \n" +
      "Заявитель:" +
      sender +
      "\n" +
      "Текст Обращения: " +
      text,
  });

  console.log(result);
}
module.exports = CreateMail;