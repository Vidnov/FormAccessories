const Users = require("../model/Users");

async function EditStatusRequest(id) {
  console.log(id);
  return new Promise((res, rej) => {
    Users.updateMany(
      { "Request._id": id },
      {
        $set: {
          "Request.$.Seen":false,
          "Request.$.Status":"На Рассмотрении"
        },
      }
    )
      .then((r) => {
       res (r)
      })
      .catch((e) => {
        rej(e)
      });
  });
}

module.exports = EditStatusRequest;
