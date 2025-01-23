import { useState } from 'react'
import './App.css'
import Button from './components/Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
        <Button text={'Good'} onClick={() => setGood(good + 1)} />
        <Button text={'Neutral'} onClick={() => setNeutral(neutral + 1)} />
        <Button text={'Bad'} onClick={() => setBad(bad + 1)} />
      </div>

      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  );
}

export default App
