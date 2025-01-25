import axios from "axios";

export type Person = {
  name: string;
  number: string;
}

const baseURL = 'http://localhost:3001/persons';

const fetchPersons = async(): Promise<Person[]> => {
    const response = axios.get(baseURL);
    return (await response).data
}

const createPerson = async(newPerson: Person): Promise<Person> => {
    const response = axios.post(baseURL, newPerson);
    return (await response).data;
}

const deletePerson = async(id: number): Promise<boolean> => {
    const response = axios.delete(`${baseURL}/${id}`);
    return (await response).data;
}

export default { fetchPersons, createPerson, deletePerson };