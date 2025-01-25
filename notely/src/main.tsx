import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

export interface Note {
  id: number;
  content: string;
  important: boolean;
}

const notes: Note[] = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App notes={notes} />
  </StrictMode>,
)
