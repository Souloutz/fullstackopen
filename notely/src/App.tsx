import React, { useEffect, useState } from 'react';
import './App.css';
import NoteInfo from './components/NoteInfo';
import { Note } from './main';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const getNotes = () => {
    console.log('Effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('Promise Fulfilled');
        const notes: Note[] = response.data;
        setNotes(notes);
      });
  }

  useEffect(getNotes, [])
  console.log('Render', notes.length, 'notes');

  const addNote = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const noteObject: Note = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote('')
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewNote(event.target.value);
  };

  const notesToShow: Note[] = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note =>
          <NoteInfo key={note.id} note={note} />
        )}
      </ul>

      <form style={{ marginTop: '3rem' }} onSubmit={addNote}>
        <label>Note: </label>
        <input value={newNote} onChange={handleNoteChange} />
        <button style={{ marginLeft: '1rem' }}type='submit'>Save</button>
      </form>
    </div>
  );
};

export default App;
