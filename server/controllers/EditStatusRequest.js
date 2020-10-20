

const Users = require("../model/Users");

async function EditStatusRequest(id) {
  console.log(id);
  return new Promise((res, rej) => {
    Users.update(
      { "Request._id": id },
      {
        $set: {
          Request: {
            Seen: false,
            Status: "На Рассмотрении"
          },
        },
      }
    )
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

module.exports = EditStatusRequest;


