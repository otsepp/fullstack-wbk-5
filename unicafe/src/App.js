import React from 'react'
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

const klik = (nappi) => () => {
	store.dispatch({type: nappi})
}

const Statistiikka = () => {
  const palautteita = 0

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }
	
	const state = store.getState()
	
  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td></td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td></td>
          </tr>
        </tbody>
      </table>

			<button onClick={klik('ZERO')}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={klik('GOOD')}>hyvä</button>
        <button onClick={klik('OK')}>neutraali</button>
        <button onClick={klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

export default { App, store }
