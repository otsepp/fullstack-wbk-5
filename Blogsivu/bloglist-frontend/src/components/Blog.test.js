import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
	const blog = {
		title: 'Kompenenttitestauksen tärkeys',
		author: 'Fred Fuchs',
		url: 'www.undefined.com',
		likes: 45,
		user: {
			name: 'William Wright'
		}
	}
	const mockHandler = jest.fn()
	
	const blogComponent = shallow(
		<Blog 
			blog={blog}
			blogLikeHandler={mockHandler}
			removeBlogHandler={mockHandler}
			loggedUser={blog.user}
		/>
	)
	
	it('only shows title and author before clicking', () => {
		const contentDiv = blogComponent.find('.content')
		const title = contentDiv.find('.titleClickable')
		const author = contentDiv.find('.author')
		
		expect(title.text()).toContain(blog.title)
		expect(author.text()).toContain(blog.author)
	})
	
	it('shows title, author, url, likes and user after clicking', () => {
		blogComponent.find('.content').find('.titleClickable').simulate('click')
		
		const contentDiv = blogComponent.find('.content-full')
		const title = contentDiv.find('.titleClickable')
		const author = contentDiv.find('.author')
		const url = contentDiv.find('a')
		const likes = contentDiv.find('.likes')
		const user = contentDiv.find('.addedBy')
	
		expect(title.text()).toContain(blog.title)
		expect(author.text()).toContain(blog.author)
		expect(url.text()).toContain(blog.url)
		expect(likes.text()).toContain(blog.likes)
		expect(user.text()).toContain(blog.user.name)
	})
	
})

