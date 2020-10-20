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
        console.log(r);

        Users.find({}).then((r) => {
          console.log("asdads");
          console.log(r);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

module.exports = EditStatusRequest;
