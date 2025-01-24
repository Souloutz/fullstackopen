import './App.css'
import Course from './components/Course';

function App() {
  const course = {
    id: 1,
    name: 'Half Stack Application Development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      }, 
      {
        name: 'Using Props to Pass Data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a Component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <Course course={course} />  
  );
}

export default App
