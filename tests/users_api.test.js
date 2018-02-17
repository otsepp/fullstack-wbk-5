const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const {initialUsers, usersInDb} = require('./test_helper')

beforeAll(async () => {
	await User.remove({})
	let userObj = new User(initialUsers[0])
	await userObj.save()
  userObj = new User(initialUsers[1])
	await userObj.save()
})

describe('viewing users', async () => {
	
	test('users in DB are found', async () => {
		const response = await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)
			
		expect(response.body.length).toBe(initialUsers.length)
	})
})

describe('adding users', async () => {
	const newUser = {
			username: 'Vampyr666',
			name: 'William',
			password: 'password',
			adult: false
		}
	
	test('new user is added correctly', async () => {
		const response = await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		
		const users = await usersInDb()
		const usernames = users.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})
	
	test('user with non-unique username is not added', async () => {
		const users = await usersInDb()
		const someUser = users[0]
		
		newUser.username = someUser.username
		
		const response = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		expect(response.body.error).toBe('username must be unique')
	})
	
	test('user with too short username is not added', async () => {
		newUser.username = 'a1'
		
		const response = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		expect(response.body.error).toBe('username must be 3 characters long')
	})
	
	test('user with undefined data is not added', async () => {
		newUser.username = undefined
		newUser.name = undefined
		newUser.password = undefined
		
		const response = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		expect(response.body.error).toBe('undefined data given')
	})
	
})

afterAll(() => {
	server.close()
})