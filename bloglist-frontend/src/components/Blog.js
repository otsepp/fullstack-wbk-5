import React from 'react'

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
			removeBlogHandler: props.removeBlogHandler
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
		
		if (!this.state.showFull) {
			return (
				<div style={blogStyle}>
					<p onClick={this.toggleShowFull}>{this.state.title}</p>
					<p>{this.state.author}</p>
				</div> 
			)
		}
		let addedBy = null
		if (this.state.user !== undefined)
			addedBy = <p>added by {this.state.user.name}</p>
		
		return (
			<div style={blogStyle} >
				<p onClick={this.toggleShowFull}>{this.state.title}</p>
				<p>{this.state.author}</p>
				<a href={this.state.url}>{this.state.url}</a>
				<p>{this.state.likes} likes</p>
				<button onClick={() => this.state.blogLikeHandler(this.state.blog)}>like</button>
				{addedBy}
				<button onClick={() => this.state.removeBlogHandler(this.state.blog)}>delete</button>
			</div>  
		)
	}
	
}

export default Blog