const express = require("express");
const Retail = require("../model/Retail");

async function FindRetailByAddress(Mail_Retail) { // Временно выставлен Mail_Retail вместо Address_Retail
  return new Promise(function (resolve, reject) {
    Retail.findOne({ "Mail_Retail":Mail_Retail })
      .then((result) => {
       resolve(result)
      })
      .catch(() => {
        reject("err");
      });
  });
}
module.exports = FindRetailByAddress;
