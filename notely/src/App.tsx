import React, { useEffect, useState } from 'react';
import './App.css';
import NoteInfo from './components/NoteInfo';
import noteService, { NewNote, Note } from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getNotes = () => {
    noteService.fetchNotes()
      .then(fetchedNotes => {
        setNotes(fetchedNotes);
      });
  }
  useEffect(getNotes, [])

  const addNote = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const noteObject: NewNote = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.createNote(noteObject)
      .then((returned: Note | string) => {
        if (typeof returned === 'string') {
          setErrorMessage(returned);
          return;
        }

        setNotes(notes.concat(returned));
        setNewNote('');
      })
  };

  const toggleImportance = (id: number) => {
    const note = notes.find(note => note.id === id)!;
    const updatedNote = {...note, important: !note.important};

    noteService.updateNote(id, updatedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note));
      })
      .catch(err => {
        console.log(err)
        setErrorMessage(`Note '${note.content} was already deleted from the server.'`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewNote(event.target.value);
  };

  const notesToShow: Note[] = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note =>
          <NoteInfo key={note.id} note={note} toggleImportance={() => toggleImportance(note.id!)} />
        )}
      </ul>

      <form style={{ marginTop: '3rem' }} onSubmit={addNote}>
        <label>Note: </label>
        <input value={newNote} onChange={handleNoteChange} />
        <button style={{ marginLeft: '1rem' }} type='submit'>Save</button>
      </form>

      <Footer />
    </div>
  );
};

export default App;
