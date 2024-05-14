//unit tests

const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (likes) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
  return likes.reduce(reducer, 0);

  //blogs.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  });

  //console.log(mostLiked)
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorCount = lodash.countBy(blogs, "author");
  //console.log(authorCount)
  const keys = Object.keys(authorCount);
  //console.log('keys: ', keys)
  //console.log('blogs: ', authorCount[keys[keys.length - 1]])

  return {
    author: keys[keys.length - 1],
    blogs: authorCount[keys[keys.length - 1]],
  };
};

const mostLikedBlogs = (blogs) => {
  const filteredObject = lodash.filter(blogs, function (blog) {
    //console.log('blog.author: ', blog.author)
    return blog.author === "Edsger W. Dijkstra";
  });
  //console.log('filteredObject: ', filteredObject)

  const mostLikesbyAuthor = filteredObject.reduce((a, b) => {
    return a.likes + b.likes;
  });
  //console.log('mostLikesbyAuthor: ', mostLikesbyAuthor)

  return {
    author: filteredObject[0].author,
    likes: mostLikesbyAuthor,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikedBlogs };
