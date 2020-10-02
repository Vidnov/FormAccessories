const express = require("express");
const Users = require("../model/Users");

async function SaveNewCommentsById(id, text, sender, imageName) {
  return new Promise(function (resolve, reject) {
    Users.find({ "Request._id": id })
      .then((result) => {
        let results = "";
        
        result.forEach((ress) => {
           
          ress.Request.forEach((r) => {
            if (r.id == id) {
              results = r;
              r.Comments_block.push({
                Text_Comments: text,
                Image_Name_Comments: imageName,
                Sender_Comments: sender,
              });
            }
          });
          ress.save((e,doc)=>{
            if(e){
                console.log(e)
            }
          })
        });
      })
      .catch((e) => {
        const errr = new Error(e);
        reject(errr);
      });
  });
}
module.exports = SaveNewCommentsById;
