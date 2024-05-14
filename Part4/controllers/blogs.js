// A router object is an isolated instance of middleware and routes.
// You can think of it as a “mini-application,” capable only of performing
// middleware and routing functions. Every Express application has a built-in app router.

// need to create both model and router objects
const blogsRouter = require("express").Router() // blogs router object
const Blog = require("../models/blog")

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    res.json(blogs)
})

blogsRouter.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    console.log(blog)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end // 404 not found
    }
})

blogsRouter.post("/", async (req, res) => {
    const body = req.body

    if (!req.token) return res.status(401).json({ error: "invalid or missing token" })

    const user = req.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    const savedBlog = await blog.save() // Save the blog to the DB
    user.blogs = user.blogs.concat(savedBlog._id) // Concat the saved blog to the users" existing blog posts
    await user.save() // Save this information to the DB

    res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res) => {
    const user = req.user

    if (!user) return res.status(401).json({ error: "blog posts can only be deleted by the creator"})
    await Blog.findByIdAndRemove(req.path.replace("/", ""))
    console.log("Success")
    res.status(204).end() // No Content

})

blogsRouter.put("/:id", async (req, res) => {

    const body = req.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    updatedBlog ? res.status(200).json(updatedBlog) : res.status(404).end()

})

// module exports the router to be available for all consumers of module.
module.exports = blogsRouter