const mongoose = require("mongoose")
mongoose.set("strictQuery", true)

// define schema of a blog post and store in blogSchema
// with validation rules for each schema field
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        //minlength: 1,
    },
    author: {
        type: String,
        required: true,
        //minlength: 2,
    },
    url: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

// transform JSON data from MongoDB into readable form
blogSchema.set("toJSON", {
    transform: (doc, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})

// Blog is singular name of the model with defined schema above
module.exports = mongoose.model("Blog", blogSchema)

