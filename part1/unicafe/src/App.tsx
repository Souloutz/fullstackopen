import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleClick = (setFunction: Function, value: number) => {
    setFunction(value + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
        <Button text={'Good'} onClick={() => handleClick(setGood, good)} />
        <Button text={'Neutral'} onClick={() => handleClick(setNeutral, neutral)} />
        <Button text={'Bad'} onClick={() => handleClick(setBad, bad)} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
}

export default App
