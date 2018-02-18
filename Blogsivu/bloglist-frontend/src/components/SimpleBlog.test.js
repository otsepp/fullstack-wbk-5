import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
	const simpleBlog = {
		title: 'Kompenenttitestauksen tärkeys',
		author: 'Fred Fuchs',
		url: 'www.undefined.com',
		likes: 45
	}
	const mockHandler = jest.fn()
	const simpleBlogComponent = shallow(
		<SimpleBlog 
			blog={simpleBlog}
			onClick={mockHandler}
		/>
	)
	
	it('renders title', () => {
		const contentDiv = simpleBlogComponent.find('.titleAndAuthor')
		expect(contentDiv.text()).toContain(simpleBlog.title)
	})
	
	it('renders author', () => {
		const contentDiv = simpleBlogComponent.find('.titleAndAuthor')
		expect(contentDiv.text()).toContain(simpleBlog.author)
	})
	
	it('renders likes', () => {
		const contentDiv = simpleBlogComponent.find('.likes')
		expect(contentDiv.text()).toContain(simpleBlog.likes)
	})
	
	it('clicking the like button twice calls event handler twice', () => {
		const button = simpleBlogComponent.find('button')
		button.simulate('click')
		button.simulate('click')
		expect(mockHandler.mock.calls.length).toBe(2)
	})
	
})