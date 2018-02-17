const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {initialBlogs, blogsInDb} = require('./test_helper')

beforeAll(async () => {
	await Blog.remove({})
	let blogObj = new Blog(initialBlogs[0])
	await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
	await blogObj.save()
	blogObj = new Blog(initialBlogs[2])
	await blogObj.save()
	blogObj = new Blog(initialBlogs[3])
	await blogObj.save()
})

describe('viewing blogs', async () => {
	
	test('returned data is JSON', async () => {
			await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('blogs are found', async () => {
		const response = await api 
			.get('/api/blogs')
			
		expect(response.body.length).toBe(initialBlogs.length)
	})
})

describe('addition of a new blog', async () => {
	
	test('a blog is added correctly', async () => {
		const blogsAtStart = await blogsInDb()
				
		const newBlog = {
			title: 'How to code JS',
			author: 'Will Auberjonois',
			url: 'www.blog.com/123',
			likes: 100
		}
		
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
			
		const blogsAfterOperation = await blogsInDb()
		expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
		
		const titles = blogsAfterOperation.map(b => b.title)
		expect(titles).toContain('How to code JS')
	})
	
	test('likes are set to 0 if not specified', async () => {
		const newBlog = {
			title: 'How to code JS',
			author: 'Will Auberjonois',
			url: 'www.blog.com/123'
		}
		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
		expect(response.body.likes).toBe(0)
	})
	
	test('Blog is not added if title is missing', async () => {
		const newBlog = {
			author: 'Will Auberjonois',
			url: 'www.blog.com/123'
		}
		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
	
	test('Blog is not added if url is missing', async () => {
		const newBlog = {
			title: 'How to code JS',
			author: 'Will Auberjonois'
		}
		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
	
})
	
afterAll(() => {
	server.close()
})