import axios from "axios";

export interface NewPerson {
    name: string;
    number: string;
}

export interface Person extends NewPerson {
    id: number;
}

const baseURL = '/api/persons';

const fetchPersons = async(): Promise<Person[]> => {
    const response = axios.get(baseURL);
    return (await response).data;
};

const createPerson = async(newPerson: NewPerson): Promise<Person> => {
    const response = axios.post(baseURL, newPerson);
    return (await response).data;
};

const updatePerson = async(updatedPerson: Person): Promise<Person> => {
    const response = axios.put(`${baseURL}/${updatedPerson.id}`, updatedPerson);
    return (await response).data;
};

const deletePerson = async(id: number): Promise<Person> => {
    const response = axios.delete(`${baseURL}/${id}`);
    return (await response).data;
};

export default { fetchPersons, createPerson, updatePerson, deletePerson };