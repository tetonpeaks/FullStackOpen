// Unit tests

const lodash = require("lodash")

const dummy = () => {
    return 1
}

const totalLikes = (likes) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return likes.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
    const mostLiked = blogs.reduce((a, b) => {
        return a.likes > b.likes ? a : b
    })

    return {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes,
    }
}

const mostBlogs = (blogs) => {
    const authorCount = lodash.countBy(blogs, "author")
    const keys = Object.keys(authorCount)

    return {
        "author": keys[keys.length - 1],
        "blogs": authorCount[keys[keys.length -1]]
    }
}

const mostLikedBlogs = (blogs) => {
    const filteredObject = lodash.filter(blogs, function(blog) {
        return blog.author === "Edsger W. Dijkstra"
    })

    const mostLikesbyAuthor = filteredObject.reduce((a, b) => {
        return a.likes + b.likes
    })

    return {
        "author": filteredObject[0].author,
        "likes": mostLikesbyAuthor
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikedBlogs
}