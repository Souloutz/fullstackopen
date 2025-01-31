import axios, { AxiosResponse } from "axios";

export interface NewNote {
    content: string;
    important: boolean;
}

export interface Note extends NewNote {
    id: number;
  }

const baseURL = '/api/notes';
const getResponseData = async (response: Promise<AxiosResponse<any, any>>) => {
    const res = await response;
    return res.data;
};

const fetchNotes = () => {
    const response = axios.get(baseURL);
    return getResponseData(response);
};

const createNote = (newNoteObject: NewNote) => {
    const response = axios.post(baseURL, newNoteObject);
    return getResponseData(response);
};

const updateNote = (id: number, updatedNoteObject: Note) => {
    const response = axios.put(`${baseURL}/${id}`, updatedNoteObject);
    return getResponseData(response);
};

export default { fetchNotes, createNote, updateNote };