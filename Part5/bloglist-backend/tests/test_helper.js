const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: "Post 1",
        author: "Jerry",
        url: "https://www.google.com",
        likes: 1,
    },
    {
        title: "Post 2",
        author: "Jerry",
        url: "https://www.google.com",
        likes: 1,
    }
]

// create unique ID for a new blog post
const nonExistingID = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'Jerry', url: 'https://www.google.com', likes: 1 })
    await blog.save()
    await blog.remove()

    return blod._id.toString()
}

// check for blog posts stored in DB
const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingID, blogsInDB }