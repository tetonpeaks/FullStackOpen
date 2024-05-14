const mongoose = require("mongoose")
mongoose.set("strictQuery", true)

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    pwHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

userSchema.set("toJSON", {
    transform: (document, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
        delete retObj.pwHash // pwHash should not be revealed!
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User