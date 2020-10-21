const express = require("express");
const nodemailer = require("nodemailer");
// Оповещение об Отклонении статуса  заявки "Завершенно"
async function CreateMailApplicant(service,user,password,recipient, address_retail,priority,text){
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
      "Завершение Заявки Отклонено "+priority+ address_retail,
    text:
      "Заявка снова перешла в статус -> На Рассмотрении от "+address_retail+" ! \n" +
      "Заявитель: " +address_retail+
      "\n" +
      "Комментарий Заявителя: "+text,
  });

  
}
module.exports = CreateMailApplicant;