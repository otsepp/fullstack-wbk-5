let token = 1234

const blogs = [

	{
		id: "5a7fed5d7ae93c038821cb8e",
		title: "Bloggers life",
		author: "William Worth",
		url: "www.blogerslife.com/blog/2jf8s834",
		likes: 22
	},
	
	{
		id: "5a8047e8f7b0d21f183bf775",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 16
	},
	
	{
		id: "5a8098bdb86cfd1b14ddedaa",
		title: "some blog",
		author: "tim tool",
		url: "http://blogbob/2017/05/05/TestDefinitions.htmll",
		likes: 3,
		user: {
			_id: "5a8063ab437ae91dfc293c15",
			username: "Gunnner2",
			name: "Bob"
		}
	}
	
]

const getAll = () => {
	return Promise.resolve(blogs)
}

export default { getAll, blogs }