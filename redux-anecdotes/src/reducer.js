const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const voteAnecdote = (state, anecdote) => {
	let state_n = state.filter(a => a.id !== anecdote.id)
	state_n = state_n.concat({...anecdote, votes: anecdote.votes + 1})
	return state_n.sort(compare)
}

const createAnecdote = (state, content) => {
	let state_n = state.concat({
		content,
		id: getId(),
		votes: 0
	})
	return state_n.sort(compare)
}

const compare = (a, b) => {
	if (a.votes < b.votes)
		return 1
	if (a.votes > b.votes)
		return -1
	return 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
		case 'VOTE':
			return voteAnecdote(state, action.anecdote)
		
		case 'CREATE':
			return createAnecdote(state, action.content)
		
		default:
			return state
	}
}

export default reducer
