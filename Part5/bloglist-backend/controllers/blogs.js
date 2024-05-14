// A router object is an isolated instance of middleware and routes.
// You can think of it as a “mini-application,” capable only of performing
// middleware and routing functions. Every Express application has a built-in app router.

// need to create both model and router objects
const blogsRouter = require('express').Router() // blogs router object
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
//const { tokenExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
    //console.log('Hi!')

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
    //console.log('req.fuck: ', req.fuck)


/*     // use find method and findAll {} and then take found blogs and json them
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
    .catch(err => next(err)) */
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    //console.log(blog)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end // 404 note found
    }
})

blogsRouter.post('/', async (req, res) => {
    
    //console.log('req.token: ', req.token)
    //console.log('fuck.fuck: ', req.fuck)
    //console.log('id: ', req.params.id)
    const body = req.body
    //const token = tokenExtractor(req)
    // User id stored in decodedToken
    //const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET_KEY)

    //if (!decodedToken || !decodedToken.id) return res.status(401).json({ error: 'token missing or invalid' })

    if (!req.token) return res.status(401).json({ error: 'invalid or missing token' })
    // Bring in the valid user with await call?
    const user = req.user
    //console.log('user: ', user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    //console.log('blog: ', blog)

    // Save the blog to the DB
    const savedBlog = await blog.save()
    // Concat the saved blog to the users' existing blog posts
    user.blogs = user.blogs.concat(savedBlog._id)
    // Save this information to the DB
    await user.save()

    //console.log('savedBlog: ', savedBlog)
    res.status(201).json(savedBlog)
    //console.log('res.status(201)', res.status(201).json(savedBlog))

/*     blog.save().then(result => {res.status(201).json(result)})
        .catch(err => next(err)) */
})

blogsRouter.delete('/:id', async (req, res) => {

    //console.log('req.path: ', req.path.replace('/', ''))
    //console.log('req.token', req.token)

    //if (!decodedToken || !decodedToken.id) return res.status(401).error({ error: 'invalid or missing token' })
    //const users = await User.findById(decodedToken.id)
    //console.log('users: ', users)
    //console.log('Hello')
    const user = req.user
    //console.log('user: ', user)
    
    if (!user) return res.status(401).json({ error: 'blog posts can only be deleted by the creator'})
    await Blog.findByIdAndRemove(req.path.replace('/', ''))
    console.log('Success')
    res.status(204).end() // No Content

})

blogsRouter.put('/:id', async (req, res) => {

/*     console.log("req.params.id: ", req.params.id)
    const originalPost = await Blog.findById(req.params.id)
    console.log("original post: ", originalPost) */
    const blog = req.body

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    updatedBlog ? res.status(200).json(updatedBlog) : res.status(404).end()
    
})

// module exports the router to be available for all consumers of module.
module.exports = blogsRouter