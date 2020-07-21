const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String
    },
    password: {
      type: String
    },
  }, {
  autoIndex: false
}, {
  timestamps: true
}
);

let user = mongoose.model("user", userSchema);

module.exports = user;
