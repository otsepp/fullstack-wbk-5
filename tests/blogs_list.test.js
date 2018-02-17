const listHelper = require('../utils/list_helper')

const manyBlogs = [
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

describe('total likes', () => {
	test('of empty list is zero', () => {
		const blogs = []
		
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(0)
	})
	test('of non-empty list is correct', () => {
		const result = listHelper.totalLikes(manyBlogs)
		expect(result).toBe(51)
	})
})

describe('favorite blog', () => {
	test('of empty list is undefined', () => {
		const blogs = []
		const result = listHelper.favoriteBlog(blogs)
		expect(result).toBe(undefined)
	})
	test('of non-empty list is correct', () => {
		const result = listHelper.favoriteBlog(manyBlogs)
		expect(result).toBe(manyBlogs[1])
	})
})

describe('author with most blogs', () => {
	test('of empty list is undefined', () => {
		const blogs = []
		const result = listHelper.mostBlogs(blogs)
		expect(result).toBe(undefined)
	})
	test('of non-empty list is correct', () => {
		const result = listHelper.mostBlogs(manyBlogs)
		expect(result).toBe('Edsger W. Dijkstra')
	})
})

describe('author with most likes', () => {
	test('of empty list is undefined', () => {
		const blogs = []
		const result = listHelper.mostLikes(blogs)
		expect(result).toBe(undefined)
	})
	test('of non-empty list is correct', () => {
		const result = listHelper.mostLikes(manyBlogs)
		expect(result).toBe('Edsger W. Dijkstra')
	})
})



