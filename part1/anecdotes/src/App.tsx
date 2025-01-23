import { useState } from 'react'
import './App.css'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const record: Record<number, number> = anecdotes.reduce((obj: Record<number, number>, _, index: number) => {
    obj[index] = 0;
    return obj;
  }, {});

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(record);
   
  const getRandomIndex = (): number => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const handleVote = (): void => {
    const copy = {...votes};
    copy[selected] += 1;

    setVotes(copy);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'center' }}>
      {anecdotes[selected]}
      <p>Has {votes[selected]} votes</p>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
        <button style={{ width: 'fit-content' }} onClick={() => handleVote()}>Vote</button>
        <button style={{ width: 'fit-content' }} onClick={() => setSelected(getRandomIndex())}>Next Anecdote</button>
      </div>
    </div>
  );
}

export default App
