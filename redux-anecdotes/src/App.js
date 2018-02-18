import React from 'react';


class App extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
			content: ''
    }
  }
	
  render() {
		let store = this.props.store
		
		const voteAnecdote = (anecdote) => {
			return () => {
				store.dispatch({type: 'VOTE', anecdote})
			}
		}
		
		const createAnecdote = (event) => {
			event.preventDefault()
			store.dispatch({type: 'CREATE', content: this.state.content})
		}
		
		const handleChange = (event) => {
			this.setState({content: event.target.value})
		}
		
    const anecdotes = store.getState()
		
    return (
      <div>
			
        <h2>Anecdotes</h2>
				
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
					
            <div>
              {anecdote.content} 
            </div>
						
            <div>
              has {anecdote.votes}
              <button onClick={voteAnecdote(anecdote)}>vote</button>
            </div>
						
          </div>
        )}
				
        <h2>create new</h2>
				
        <form onSubmit={createAnecdote}>
          <input onChange={handleChange} type="text" name="content" value={this.state.content}/>
          <button type="submit">create</button> 
        </form>
				
      </div>
    )
  }
}

export default App