const totalLikes = (blogs) => {
	if (!blogs.length)
		return 0
	
	const likes = blogs.map(blog => blog.likes)
	const reducer = (acm, cVal) => acm + cVal
	return likes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
	if (!blogs.length)
		return undefined
	
	var favBlog = {likes: 0}
	blogs.forEach(blog => {
		if (blog.likes > favBlog.likes)
			favBlog = blog
	})
	return favBlog
}

const mostBlogs = (blogs) => {
	if (!blogs.length)
		return undefined
	
	var authorsMap = new Map()
	var authorWithMost = undefined
	
	blogs.forEach(blog => {
		const key = blog.author
		
		if (authorsMap.has(key))
			authorsMap.set(key, authorsMap.get(key) + 1)
		else 
			authorsMap.set(key, 1)

		if (authorWithMost === undefined)
			authorWithMost = key
		else
			if (authorsMap.get(key) > authorsMap.get(authorWithMost))
				authorWithMost = key
	})
	return authorWithMost
}

const mostLikes = (blogs) => {
	if (!blogs.length)
		return undefined
	
	var authorsMap = new Map()
	var authorWithMost = undefined
	
	blogs.forEach(blog => {
		const key = blog.author
		const likes = blog.likes
		
		if (authorsMap.has(key))
			authorsMap.set(key, authorsMap.get(key) + likes)
		else 
			authorsMap.set(key, likes)

		if (authorWithMost === undefined)
			authorWithMost = key
		else
			if (authorsMap.get(key) > authorsMap.get(authorWithMost))
				authorWithMost = key
	})
	return authorWithMost
}

module.exports = {
	totalLikes, favoriteBlog, mostBlogs, mostLikes
}


