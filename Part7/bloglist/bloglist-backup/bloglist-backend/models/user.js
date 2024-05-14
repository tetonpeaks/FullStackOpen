const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  pwHash: String,
  // note IDs are stored inside users as a table of Mongo-IDs and refers to note-type documents (just Mongo syntax):
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
    // pwHash should not be revealed!
    delete retObj.pwHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
