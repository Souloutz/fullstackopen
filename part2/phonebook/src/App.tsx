import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Search from './components/Search';
import PersonInfo from './components/Person';
import axios from 'axios';

export type Person = {
  name: string;
  number: string;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  const fetchData = (): void => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
          setPersons(response.data);
      });
  };
  useEffect(fetchData, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // prevent default GET and reloading of page
    
    const newPerson: Person = {name: newName, number: newNumber};
    const exists = persons.some(person => person.name === newPerson.name && person.number === newPerson.number);
    if (exists) {
      alert(`${newName} has already been added to the phonebook!`)
      return
    }

    if (newName.length > 0 && newNumber.length > 0) {
      const updatedPersons = [...persons].concat(newPerson);
      setPersons(updatedPersons);
      setNewName('');
      setNewNumber('');
      console.log(`New person added and search is:`, search, `showAll:`, showAll, `& persons:`, persons);
    }
  };

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ display: 'flex', gap: '25%' }}>
      <div>
        <h2>Phonebook</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem'}}>
          <Search setSearch={setSearch} setShowAll={setShowAll} />
          <Form handleSubmit={handleSubmit} setNewName={setNewName} setNewNumber={setNewNumber} />
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <h2>Numbers</h2>
        {
          persons.length === 0 ? <p>No numbers saved</p> :
          personsToShow.map(person => <PersonInfo key={person.number} person={person} />)
        }
      </div>
    </div>
  );
};

export default App;
