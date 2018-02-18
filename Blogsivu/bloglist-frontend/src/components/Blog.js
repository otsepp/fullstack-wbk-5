import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
			blog: props.blog,
			
			title: props.blog.title,
			author: props.blog.author,
			url: props.blog.url,
			likes: props.blog.likes,
			user: props.blog.user,
			
      showFull: false,
			
			blogLikeHandler: props.blogLikeHandler,
			removeBlogHandler: props.removeBlogHandler,
			
			loggedUser: props.loggedUser
    }
  }
	
	toggleShowFull = () => {
		this.setState({showFull: !this.state.showFull})
	}
	
	render() {
		 const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
		
		const titleClickable = <p className="titleClickable" onClick={this.toggleShowFull}>{this.state.title}</p>
		const author = <p className="author">{this.state.author}</p>
		
		if (!this.state.showFull) {
			return (
				<div style={blogStyle} className="content">
					{titleClickable}
					{author}
				</div> 
			)
		}
		
		let addedBy = null
		if (this.state.user !== undefined)
			addedBy = <p className="addedBy">added by {this.state.user.name}</p>
		
		return (
			<div style={blogStyle} className="content-full">
				{titleClickable}
				{author}
				<a href={this.state.url}>{this.state.url}</a>
				<p className="likes">{this.state.likes} likes</p>
				<button onClick={() => this.state.blogLikeHandler(this.state.blog)}>like</button>
				{addedBy}
				<button onClick={() => this.state.removeBlogHandler(this.state.blog)}>delete</button>
			</div>  
		)
	}
	
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
	blogLikeHandler: PropTypes.func.isRequired,
	removeBlogHandler: PropTypes.func.isRequired,
	loggedUser: PropTypes.object.isRequired
}

export default Blog