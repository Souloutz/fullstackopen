import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

function App() {
  const course = {
    name: 'Half Stack Application Development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using Props to Pass Data',
        exercises: 7
      },
      {
        name: 'State of a Component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part) => {
        return <Content content={part} />
      })}
      <Total total={course.parts} />
    </div>
  )
}

export default App
