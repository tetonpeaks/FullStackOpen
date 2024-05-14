const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const App = require('../App')
const api = supertest(App)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
    await Blog.deleteMany()
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
})

test('blog posts are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200) // 200 OK success status response that GET request has succeeded
        .expect('Content-Type', /application\/json/)
})

test('field identifying the returned blogs should be called id', async () => {

    const blogsAtStart = await helper.blogsInDB()
    const blogToGet = blogsAtStart[0]

    //console.log(blogToGet)

    const resultBlog = await api
        .get(`/api/blogs/${blogToGet.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.id).toBeDefined()

    //console.log('resultBlog: ', resultBlog.body.id)

})
describe('addition of a new blog', () => {
    let token = null
    beforeAll(async () => {
        await User.deleteMany({})

        // create a new user, gen a token for login
        const pwHash = await bcrypt.hash('123', 10)
        const testUser = await new User({ username: 'testUser', pwHash}).save()

        const userForToken = { username: testUser.username, id: testUser.id }
        return (
            token = jwt.sign(userForToken, process.env.JWT_SECRET_KEY),
            user = testUser
        )
    })

    test('a valid blog can be posted', async () => {

        //console.log('token: ', token)
        //console.log('user: ', user)
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'Test User',
            url: 'https://www.google.com',
            likes: 1,
            user: user._id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const allBlogs = await helper.blogsInDB() // get all posts from DB
        //console.log('allBlogs: ', allBlogs)
        expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)

        const blogTitle = allBlogs.map(b => b.title)
        //console.log('blogTitle: ', blogTitle)
        expect(blogTitle).toContain('async/await simplifies making async calls')
        console.log('allBlogs: ', allBlogs)
    })

    test('a blog without a likes field will be set to 0', async () =>  {

        const badBlog = {
            title: 'a blog without likes field will be set to 0',
            author: 'Jerry',
            url: 'https://www.google.com',
            user: user._id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(badBlog)
            .expect(201) // 400 Bad Request response indicates server cannot or will not process req due perceived to be client error
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
        console.log('blogsAtEnd: ', blogsAtEnd)
        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
    /*     if (await api.expect(400)) {
            console.log('Success!')
        } */
    })

    test('A blog post without title or url fields will be rejected with 400 Bad Request', async () => {

        const blogOne = {
            author: 'This author did not specify a title nor a url',
            likes: 1,
            user: user._id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`) // will get 500 error without this now
            .send(blogOne)
            .expect(400) // Bad Request
    })

    test('A blog post without a valid token will return status code 401 Unauthorized', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'Test User',
            url: 'https://www.google.com',
            likes: 1,
            user: user._id
        }

        await api
            .post('/api/blogs')
            //.set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(401) // Unauthorized
            .expect('Content-Type', /application\/json/)
    })

    test('Deletion of a post', async () => {
        const allBlogs = await helper.blogsInDB()
        const oneBlog = allBlogs[0]

        //console.log('allBlogs: ', allBlogs)
        //console.log('oneBlog: ', oneBlog)

        // ORDER MATTERS: .set must be second api call
        await api
            .delete(`/api/blogs/${oneBlog.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204) // Not Content

        const newBlogs = await helper.blogsInDB()
        expect(newBlogs).toHaveLength(helper.initialBlogs.length - 1)
    })

})

test('Update a post', async () => {
    const allBlogs = await helper.blogsInDB()
    const oneBlog = allBlogs[0]
    //oneBlog.title = 'Post 1 Updated'

    //console.log('oneBlog: ', oneBlog)
    await api
        .put(`/api/blogs/${oneBlog.id}`)
        .send({title: 'Post 1 Updated'})
        .expect(200) // Is this what I expect? yes

    const newBlogs = await helper.blogsInDB()
    //console.log('newBlogs: ', newBlogs)
    const titles = newBlogs.map(n => n.title)
    //console.log('titles: ', titles)
    expect(titles).toContain('Post 1 Updated')
})

afterAll(() => {
    mongoose.connection.close()
})