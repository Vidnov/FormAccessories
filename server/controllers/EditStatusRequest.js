const { request } = require("express");
const express = require("express");
const Users = require("../model/Users");

async function EditStatusRequest(id) {
  return new Promise((res, rej) => {
    Users.findOne({ "Request._id": id })
      .then((result) => {
        result.Request.forEach((request) => {
          if (request._id == id) {
            
            request.Status = "На Рассмотрении";
            console.log(request.Status )
            
          }
        });
        result.save() 
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

module.exports = EditStatusRequest;
