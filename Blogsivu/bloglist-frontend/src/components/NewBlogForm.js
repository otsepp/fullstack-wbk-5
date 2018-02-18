import React from 'react'

const NewBlogForm = ({handleSubmit, handleFieldChange, title, author, url}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>title
				<input 
					type="text" 
					name="title" 
					value={title} 
					onChange={handleFieldChange}/>
			</div>
			<div>author
				<input 
					type="text" 
					name="author" 
					value={author} 
					onChange={handleFieldChange}/>
			</div>
			<div>url
				<input 
					type="text" 
					name="url" 
					value={url} 
					onChange={handleFieldChange}/>
			</div>
			<button type="submit">create</button>
		</form>
	)
}

export default NewBlogForm