import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Search from './components/Search';
import PersonInfo from './components/Person';
import personService, { NewPerson, Person } from './services/person';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Helper Function for useEffect
  const fetchData = () => {
    personService.fetchPersons()
      .then(persons => {
        console.log('Fetched!');
        setPersons(persons);
    });
  };
  useEffect(fetchData, []);

  // Helper Function for Displaying Notification
  const displayNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Handler for Form Submittion
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default GET and reloading of page
    
    const newPerson: NewPerson = {name: newName, number: newNumber};
    const existingPerson: Person | undefined = persons.find(person => person.name === newPerson.name);
    
    // console.log('Clicked!', 'New:', newPerson, 'Current:', persons);
    if (existingPerson !== undefined) {
      if (window.confirm(`'${existingPerson.name}' has already been added! Do you wish to replace the previous number?`)) {
        const updatedPerson = {...newPerson, id: existingPerson.id};
        personService.updatePerson(updatedPerson)
          .then(updatedPerson => {

            // Replace updated person in copied state array
            const updatedPersons = [...persons].map(person => person.id === updatedPerson.id ? updatedPerson : person);
            setPersons(updatedPersons);
            setNewName('');
            setNewNumber('');

            displayNotification(`Successfully updated number for '${updatedPerson.name}'!`);
          })
          .catch(_ => {
            displayNotification(`Error updating '${updatedPerson.name}'.`);
          });

        return;
      }
      
      displayNotification(`'${existingPerson.name}' has already been added to the phonebook!`);
      return;
    }

    if (newName.length > 0 && newNumber.length > 0) {
      personService.createPerson(newPerson)
        .then(createdPerson => {
          const updatedPersons = [...persons].concat(createdPerson);
          setPersons(updatedPersons);
          setNewName('');
          setNewNumber('');

          displayNotification(`Successfully added '${createdPerson.name}' to phonebook!`);
        });
    }
  };

  // Handler for Person Deletion
  const handleDelete = (person: Person) => {
    if (window.confirm(`Warning! Do you want to delete '${person.name}' from your contacts?`))
    personService.deletePerson(person.id)
      .then(deletedPerson => {
        const updatedPersons = [...persons].filter(person => person.id !== deletedPerson.id);
        setPersons(updatedPersons);

        displayNotification(`Successfully removed '${deletedPerson.name}' from the phonebook!`);
      });
  };

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Notification message={notification} />
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
    </>
  );
};

export default App;
