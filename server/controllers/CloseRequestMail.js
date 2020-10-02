const express = require("express");
const nodemailer = require("nodemailer");
// Оповещение о закрытии заявки
async function CloseRequestMail(recipient, id) {
  //let testEmailAccount = await nodemailer.createTransport();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nvidnov@gmail.com",
      pass:  "UFhybr419153!@",
    },
  });

  let result = await transporter.sendMail({
    from: '"HelpDesk" support@sotiks.net',
    to: recipient,
    subject: "Заявка номер " + id + " Закрыта ! \n",

    html:
      "К вам поступило  новое обращение! \n" +
      "Заявка номер " +
      id +
      " Закрыта ! \n" +
      "Это означает, что  Ваше обращение выполненно в полной мере <br>" +
      "Если вы не согласны со статусом заявки перейдите по ссылке: <br>" +
      `<a href="http://localhost:8080/#/comment_retail/${id}">Не согласен</a>`,
  });
  console.log(result)
}
module.exports = CloseRequestMail;
