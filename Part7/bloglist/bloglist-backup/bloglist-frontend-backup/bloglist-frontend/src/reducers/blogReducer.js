import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            //console.log("state: ", state, "action: ", action)
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        updateBlog(state, action) {
            const likedBlog = action.payload
            const { id } = likedBlog
            return state.map((blog) =>
                blog.id !== id ? blog : likedBlog
            )
        },
        removeBlog(state, action) {
            //console.log("state: ", state, "action: ", action)
            const id = action.payload
            return state.filter((blog) => blog.id !== id)
        }
    }
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const updateLikes = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(blog)
        dispatch(updateBlog(updatedBlog))
    }
}

export const deleteBlog = (blog, userId) => {
    const { id } = blog
    return async (dispatch) => {
        await blogService.remove(blog, userId)
        dispatch(removeBlog(id))
    }
}

export const createComment = (id, comment) => {
    return async (dispatch) => {
        const commentedBlog = await blogService.addComment(id, comment)
        dispatch(updateBlog(commentedBlog))
    }
}
export default blogSlice.reducer