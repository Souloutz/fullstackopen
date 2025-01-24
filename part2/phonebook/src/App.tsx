import { FormEvent, useState } from 'react';
import './App.css';

type Person = {
  name: string;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: 'Howard Kong' }
  ]);
  const [newName, setNewName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // prevent default GET and reloading of page
    
    const newPerson: Person = {name: newName};
    const exists = persons.some(person => person.name === newPerson.name);
    if (exists) {
      alert(`${newName} has already been added to the phonebook!`)
      return
    }

    if (newName.length > 0)
      setPersons([...persons].concat(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          Name: <input onChange={e => setNewName(e.target.value)}/>
        </div>

        {/* <div>Debug: {newName}</div> */}

        <div>
          <button type='submit'>Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.length === 0 ? <p>No numbers saved</p> :
      persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  );
};

export default App;
