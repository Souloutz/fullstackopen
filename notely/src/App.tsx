import React, { useState } from 'react';
import './App.css'
import NoteInfo from './components/NoteInfo';
import { Note } from './main';

type Props = {
  notesData: Note[];
}

const App: React.FC<Props> = ({ notesData }) => {
  const [notes, setNotes] = useState(notesData);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(false);

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

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default App;
