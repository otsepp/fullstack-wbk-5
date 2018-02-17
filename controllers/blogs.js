const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', {_id: 1, username: 1, name: 1})
		
	response.json(blogs.map(Blog.format))
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	try {
		const token = getTokenFrom(request)
		const decodedToken = jwt.verify(token, process.env.SECRET)
		
		if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
		
		if (body.title === undefined || body.title === '')
			return response.status(400).json({ error: 'title missing' })
		if (body.author === undefined || body.author === '')
			return response.status(400).json({ error: 'author missing' })
		if (body.url === undefined || body.url === '')
			return response.status(400).json({ error: 'url missing' })
		
		const user = await User.findById(decodedToken.id)
		
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes === 0 ? 0 : body.likes,
			user: user._id
		})
		
		const savedBlog = await blog.save()
		
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		
		response.json(Blog.format(savedBlog))
		
	} catch (exception) {
		if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
			console.log(exception)
			response.status(500).json({error: 'Something went wrong...'})
		}
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	try {
		const blogToRemove = await Blog.findById(request.params.id)
		
		if (blogToRemove.user !== undefined) {
			const token = getTokenFrom(request)
			const decodedToken = jwt.verify(token, process.env.SECRET)
		
			if ((!token || !decodedToken.id)) {
				return response.status(401).json({ error: 'token missing or invalid' })
			}
			const loggedUser = await User.findById(decodedToken.id)
		
			if (blogToRemove.user.toString() !== loggedUser._id.toString())
				return response.status(400).json({ error: 'wrong user' })
		}
		
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
		
	} catch (exception) {
		console.log(expection)
		response.status(400).send({ error: 'malformatted id' })
	}
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}
	
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
		response.json(Blog.format(updatedBlog))
	} catch (error) {
		console.log(error)
		response.status(400).send({ error: 'malformatted id' })
	}
})

module.exports = blogsRouter