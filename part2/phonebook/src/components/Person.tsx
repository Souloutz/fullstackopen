import { Person } from "../services/person";

type Props = {
    person: Person;
    handleDelete: (id: number) => void;
}

const PersonInfo: React.FC<Props> = ({ person, handleDelete }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ flexGrow: 4 }}>{person.name} - {person.number}</p>
            <button style={{ fontSize: '0.75rem', height: 'fit-content' }} onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
    );
};

export default PersonInfo;