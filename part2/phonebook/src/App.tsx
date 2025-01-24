import { FormEvent, useState } from 'react';
import './App.css';
import Form from './components/Form';

type Person = {
  name: string;
  number: string;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: 'Howard Kong', number: '917-517-5963' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // prevent default GET and reloading of page
    
    const newPerson: Person = {name: newName, number: newNumber};
    const exists = persons.some(person => person.name === newPerson.name && person.number === newPerson.number);
    if (exists) {
      alert(`${newName} has already been added to the phonebook!`)
      return
    }

    if (newName.length > 0 && newNumber.length > 0)
      setPersons([...persons].concat(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Form handleSubmit={handleSubmit} setNewName={setNewName} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      {persons.length === 0 ? <p>No numbers saved</p> :
      persons.map(person => <p key={person.number}>{person.name} - {person.number}</p>)}
    </div>
  );
};

export default App;
