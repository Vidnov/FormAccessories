const express = require("express");
const Users = require("../model/Users");

async function FindRequestById(id) {
  return new Promise(function (resolve, reject) {
    Users.find({ "Request._id": id })
      .then((result) => {
        let results = "";
        result.forEach((ress) => {
          ress.Request.forEach((r) => {
            if (r.id == id) {
              results = r;
              resolve(results);
            }
          });
        });
      })
      .catch(() => {
        reject("err");
      });
  });
}
module.exports = FindRequestById;
