import axios, { AxiosResponse } from "axios";

export interface NewPerson {
    name: string;
    number: string;
}

export interface Person extends NewPerson {
    id: number;
}

const baseURL = '/api/persons';

const getResponseData = async (response: Promise<AxiosResponse<any, any>>) => {
    try {
        const res = await response;
        return res.data;
    } catch (err: any) {
        return err.response.data.error;
    }
};

const fetchPersons = async(): Promise<Person[]> => {
    const response = axios.get(baseURL);
    return getResponseData(response);
};

const createPerson = async(newPerson: NewPerson): Promise<Person> => {
    const response = axios.post(baseURL, newPerson);
    return getResponseData(response);
};

const updatePerson = async(updatedPerson: Person): Promise<Person> => {
    const response = axios.put(`${baseURL}/${updatedPerson.id}`, updatedPerson);
    return getResponseData(response);
};

const deletePerson = async(id: number): Promise<Person> => {
    const response = axios.delete(`${baseURL}/${id}`);
    return getResponseData(response);
};

export default { fetchPersons, createPerson, updatePerson, deletePerson };