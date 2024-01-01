import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

const blogs = [{
  id: '1',
  title: 'Test Blog',
  author: 'Test Author',
  url: 'TestURL',
  user: [{
    username: 'TestUser'
  }],
  likes: 0
}]

describe('Blog Tests related to exercises 5.13-5.16', () => {
  test('Renders only title and author, but not likes, url and user by default (Exercise 5.13)', () => {
    const { container } = render(<Blog blogs={blogs} userDetails={{ name: 'Test User', username: 'TestUser' }} test={true}/>)

    const blogTitleParagraph = container.querySelector('.blogTitleParagraph')
    const blogWhenExpandedContent = container.querySelector('.blogWhenExpandedContent')

    expect(blogTitleParagraph).toHaveTextContent('Test Blog Test Author')
    expect(blogWhenExpandedContent).toHaveStyle('display: none')
  })

  test('Likes, url and user is shown only after show more button is clicked (Exercise 5.14)', async () => {
    const { container } = render(<Blog blogs={ blogs } userDetails={{ name: 'Test User', username: 'TestUser' }} test={ true }/>)
    const user = userEvent.setup()

    const blogTitleParagraph = container.querySelector('.blogTitleParagraph')
    const blogWhenExpandedContent = container.querySelector('.blogWhenExpandedContent')

    expect(blogTitleParagraph).toHaveTextContent('Test Blog Test Author')
    expect(blogWhenExpandedContent).toHaveStyle('display: none')

    const button = container.querySelector('.blogExpandButton')
    await user.click(button)
    expect(blogWhenExpandedContent).toHaveStyle('display: block')
  })

  test('If like button is clicked twice then event handler is called twice (Exercise 5.15)', async () => {
    const mockHandler = jest.fn()
    const { container } = render(<Blog blogs={blogs} userDetails={{ name: 'Test User', username: 'TestUser' }} test={ true } likeButton={ mockHandler }/>)
    const user = userEvent.setup()

    const blogTitleParagraph = container.querySelector('.blogTitleParagraph')
    const blogWhenExpandedContent = container.querySelector('.blogWhenExpandedContent')

    expect(blogTitleParagraph).toHaveTextContent('Test Blog Test Author')
    expect(blogWhenExpandedContent).toHaveStyle('display: none')

    const expandButton = container.querySelector('.blogExpandButton')
    await user.click(expandButton)
    expect(blogWhenExpandedContent).toHaveStyle('display: block')

    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('Creating a blog passes all details properly (Exercise 5.16)', async () => {
    const mockHandler = jest.fn()
    const { container } = render(<CreateBlog test={true} addBlog={mockHandler}/>)
    const user = userEvent.setup()

    const titleInput = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput = container.querySelector('.urlInput')
    const createBlog = container.querySelector('.createBlog')

    await user.type(titleInput, 'Test Blog')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'Test URL')
    await user.click(createBlog)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Test Blog')
    expect(mockHandler.mock.calls[0][0].author).toBe('Test Author')
    expect(mockHandler.mock.calls[0][0].url).toBe('Test URL')
  })
})