import { useState } from 'react'
import './App.css'
import Button from './components/Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClick = (setFunction: Function, value: number) => {
    setFunction(value + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
        <Button text={'Good'} onClick={() => handleClick(setGood, good)} />
        <Button text={'Neutral'} onClick={() => handleClick(setNeutral, neutral)} />
        <Button text={'Bad'} onClick={() => handleClick(setBad, bad)} />
      </div>

      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {all / 3}</p>
      <p>Positive: {all !== 0 ? (good / all) * 100 : '-'}%</p>
    </div>
  );
}

export default App
