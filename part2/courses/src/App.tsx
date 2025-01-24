import './App.css'
import Course from './components/Course';

function App() {
  const courses = [
    {
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
        },
        {
          name: 'Reduce',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }];

  return (
    <>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  );
}

export default App
