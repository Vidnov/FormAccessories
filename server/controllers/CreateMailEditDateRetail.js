const express = require("express");
const nodemailer = require("nodemailer");
// Оповещение о назначении даты исполнения заявки 
async function CreateMailEditDateRetail(service,user,password,recipient,executor,date,id){
//let testEmailAccount = await nodemailer.createTransport(); 
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
      "Назначен срок выполнения  заявки "+id+" Исполнитель: "+executor,
    text:
      "Заявка номер "+id+" принята в работу \n" +
      "Исполнитель : " +executor+
      "\n" +
      "Крайний срок выполнения заявки: "+date,
  });

  console.log(result);
}
module.exports = CreateMailEditDateRetail;