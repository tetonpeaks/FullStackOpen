import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import PostForm from "./PostForm"

describe("<Blog />", () => {
    const post = {
        title: "a blog renders only title and author",
        author: "testuser",
        url: "testuser.com",
        likes: 0,
        user: {
            username: "testuser",
            name: "Test User",
        }
    }

    let component

    const likePostMockHandler = jest.fn()
    const deletePostMockHandler = jest.fn()

    beforeEach(() => {
        component = render(<Blog
            key={post.id}
            blog={post}
            likePost={likePostMockHandler}
            deletePost={deletePostMockHandler} />)
    })

    test("component displaying a blog renders only the blog title and author", () => {
        expect(component.container.querySelector(".title")).toHaveTextContent(post.title)
        expect(component.container.querySelector(".author")).toHaveTextContent(post.author)
        expect(component.queryByText(post.url)).not.toBeInTheDocument()
        expect(component.queryByText("Likes")).not.toBeInTheDocument()
    })

    test("when deets button is pressed the url and likes are displayed", async () => {
        const user = userEvent.setup() // setup the user
        const button = screen.getByText("Show")
        await user.click(button) // simulate click

        const div = component.container.querySelector(".togglableContent")
        expect(div).not.toHaveStyle("display: none")
    })

    test("when like button is pressed 2x the event handler the component receives as props is called 2x", async () => {
        const user = userEvent.setup()
        const showButton = component.getByText("Show") // show deets
        await user.click(showButton)

        const likeButton = screen.getByText("Like")
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likePostMockHandler.mock.calls).toHaveLength(2)
    })
})

describe("<PostForm />", () => {
    const post = {
        title: "a blog renders only title and author",
        author: "testuser",
        url: "testuser.com",
        likes: 0,
        user: {
            username: "testuser",
            name: "Test User",
        }
    }

    let component

    const createPostMockHandler = jest.fn()

    beforeEach(() => {
        component = render(<PostForm createPost={createPostMockHandler} />)
    })

    test("Form calls the event handler it received as props (createPost) with the correct deets", async () => {
        const user = userEvent.setup()

        const inputTitle = component.container.querySelector(".title")
        const inputAuthor = component.container.querySelector(".author")
        const inputUrl = component.container.querySelector(".url")
        const saveButton = screen.getByText("Post")

        await user.type(inputTitle, post.title)
        await user.type(inputAuthor, post.author)
        await user.type(inputUrl, post.url)
        await user.click(saveButton)

        expect(createPostMockHandler.mock.calls).toHaveLength(1)
        expect(createPostMockHandler.mock.calls[0][0].title).toBe(post.title)
        expect(createPostMockHandler.mock.calls[0][0].author).toBe(post.author)
        expect(createPostMockHandler.mock.calls[0][0].url).toBe(post.url)
    })
})
