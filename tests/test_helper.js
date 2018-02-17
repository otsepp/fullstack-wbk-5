const Blog = require('../models/blog')
const User = require('../models/user')

const format = (blog) => {
	return {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes,
		id: blog._id
	}
}

const initialBlogs = [
  {
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0
		},
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 16,
			__v: 0
		},
		{
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		},
		{
			_id: "5a422b891b54a676234d17fa",
			title: "First class tests",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
			likes: 16,
			__v: 0
		}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(format)
}

const initialUsers = [
	{
    "_id": "5a805e6a71f98821fc9c0756",
    "username": "leetman",
    "name": "bill",
		"adult": true,
    "passwordHash": "$2a$10$zTH6pKVZivxGfN8KDo8bqON.8.sesjJCBWlrpm5kmDvrhm7M9nIjW",
    "__v": 0
	},
	{
    "_id": "5a805e8c71f98821fc9c0757",
    "username": "Gunnner",
    "name": "Bob",
		"adult": false,
    "passwordHash": "$2a$10$vKSYyfuonxd5t4K7MUdyxO7PTe6.AEyKF4gH0DqqKBAS9bsW.gl5a",
    "__v": 0
	}
]

const usersInDb = async () => {
	const users = await User.find({})
	return users
}

module.exports = {
	initialBlogs, blogsInDb, initialUsers, usersInDb
}
