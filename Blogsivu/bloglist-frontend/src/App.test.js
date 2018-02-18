import React from 'react'
import { mount, shallow } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
	let app
	let contentDiv
	
	describe('when user is not logged', () => {
		beforeEach(() => {
			app = mount(<App />)
			app.update()
			contentDiv = app.find('.content-not-logged')
    })

    it('only login form is rendered', () => {
			expect(contentDiv.find('.loginForm').length).toBe(1)
    })
		
  })
	
})
