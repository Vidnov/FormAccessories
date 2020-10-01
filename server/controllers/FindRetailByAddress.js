const express = require("express");
const Retail = require("../model/Retail");

async function FindRetailByAddress(address) { // Временно выстевлен Mail_Retail вместо Address_Retail
  return new Promise(function (resolve, reject) {
    Retail.findOne({ "Mail_Retail":address })
      .then((result) => {
       resolve(result)
      })
      .catch(() => {
        reject("err");
      });
  });
}
module.exports = FindRetailByAddress;
