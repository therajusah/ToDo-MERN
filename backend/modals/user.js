const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
},
  username: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  User: [
    {
    type:mongoose.Types.ObjectId,
    ref: "User",
  },
],
});

module.exports = mongoose.model("User", userSchema);
