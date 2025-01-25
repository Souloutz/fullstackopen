import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Search from './components/Search';
import PersonInfo from './components/Person';
import personService, { NewPerson, Person } from './services/person';

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  const fetchData = () => {
    personService.fetchPersons()
      .then(persons => {
        console.log('Fetched!');
        setPersons(persons);
    });
  };
  useEffect(fetchData, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // prevent default GET and reloading of page
    
    const newPerson: NewPerson = {name: newName, number: newNumber};
    const exists = persons.some(person => person.name === newPerson.name && person.number === newPerson.number);
    console.log('Clicked!', 'Exists:', exists, 'New:', newPerson, 'Current:', persons);
    if (exists) {
      alert(`${newName} has already been added to the phonebook!`)
      return
    }

    if (newName.length > 0 && newNumber.length > 0) {
      personService.createPerson(newPerson)
        .then(createdPerson => {
          const updatedPersons = [...persons].concat(createdPerson);
          setPersons(updatedPersons);
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const handleDelete = (id: number) => {
    personService.deletePerson(id)
      .then(deletedPerson => {
        const updatedPersons = [...persons].filter(person => person.id !== deletedPerson.id);
        setPersons(updatedPersons);
      });
  };

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ display: 'flex', gap: '25%' }}>
      <div>
        <h2>Phonebook</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem'}}>
          <Search setSearch={setSearch} setShowAll={setShowAll} />
          <Form inputName={newName} inputNumber={newNumber} handleSubmit={handleSubmit} setNewName={setNewName} setNewNumber={setNewNumber} />
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <h2>Numbers</h2>
        {
          persons.length === 0 ? <p>No numbers saved</p> :
          personsToShow.map(person => <PersonInfo key={person.number} person={person} handleDelete={handleDelete} />)
        }
      </div>
    </div>
  );
};

export default App;
