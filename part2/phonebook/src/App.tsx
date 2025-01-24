import { FormEvent, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Search from './components/Search';
import PersonInfo from './components/Person';

export type Person = {
  name: string;
  number: string;
}

const setData: Person[] = [
  { name: 'Howard Kong', number: '917-517-5963' },
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
];

const App = () => {
  const [persons, setPersons] = useState<Person[]>(setData);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [shownPersons, setShownPersons] = useState<Person[]>(setData);

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
      handleSearch(search);
      console.log(`New person added and search is:`, search, `with shownPersons:`, shownPersons, `& persons:`, persons);
    }
  };

  const handleSearch = (value: string): void => {
    if (value.length === 0) {
      setShownPersons(persons)
      return
    }

    const shownPersons = [];
    for (const person of persons) {
      if (person.name.toLowerCase().includes(value.toLowerCase())) 
        shownPersons.push(person);
    }

    setShownPersons(shownPersons);
    console.log(shownPersons);
  };

  return (
    <div style={{ display: 'flex', gap: '25%' }}>
      <div>
        <h2>Phonebook</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem'}}>
          <Search setSearch={setSearch} handleSearch={handleSearch} />
          <Form handleSubmit={handleSubmit} setNewName={setNewName} setNewNumber={setNewNumber} />
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <h2>Numbers</h2>
        {persons.length === 0 ? <p>No numbers saved</p> :
        search.length === 0 ? 
        persons.map(person => <PersonInfo key={person.number} person={person} />) :
        shownPersons.map(shownPerson => <PersonInfo key={shownPerson.number} person={shownPerson}/>)}
        {/* persons.map(person => <p key={person.number}>{person.name} - {person.number}</p>)} */}
      </div>
    </div>
  );
};

export default App;
