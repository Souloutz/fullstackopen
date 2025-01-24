import { Person } from "../App";

type Props = {
    person: Person;
}

const PersonInfo: React.FC<Props> = ({ person }) => {
    return (
        <>
            <p>{person.name} - {person.number}</p>
        </>
    );
};

export default PersonInfo;