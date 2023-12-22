const bcrypt = require('bcrypt')
const supertest = require('supertest')
const api_test_helper = require('../../utils/api_test_helper')
const User = require('../../models/UserModel')
const app = require('../../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({ username: 'barunpadhy', passwordHash })

    await user.save()
  })

describe('Blog and User tests related to exercises 4.15-4.23', () => {

  test('Password must be atleast 3 characters long, check if users are created in case of error (Exercise 4.16 - part 1)', async () => {
    const users = await api_test_helper.getUsers()

    const newUser = {
      username: 'barunp',
      name: 'Barunes Padhy',
      password: 'tp',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfterPost = await api_test_helper.getUsers()
    expect(usersAfterPost).toHaveLength(users.length)

    const usernames = usersAfterPost.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('Username must be atleast 3 characters long, check if users are created in case of error (Exercise 4.16 - part 2)', async () => {
    const users = await api_test_helper.getUsers()

    const newUser = {
      username: 'bp',
      name: 'Barunes Padhy',
      password: 'testpassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfterPost = await api_test_helper.getUsers()
    expect(usersAfterPost).toHaveLength(users.length)

    const usernames = usersAfterPost.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('User fails with proper statuscode and message if username already taken (Exercise 4.16 - part 3)', async () => {
    const usersAtStart = await api_test_helper.getUsers()

    const newUser = {
      username: 'barunpadhy',
      name: 'Barunes Padhy',
      password: 'testpassword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await api_test_helper.getUsers()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})