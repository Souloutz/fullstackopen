import { Note } from "../main";

type Props = {
    note: Note;
    toggleImportance: React.MouseEventHandler<HTMLButtonElement>
}

const NoteInfo: React.FC<Props> = ({ note, toggleImportance }) => {
    const label = note.important ? 'Mark Not Important' : 'Mark Important';

    return (
        <li style={{ textAlign: 'left' }}>
            <span>{note.content}</span>
            <button style={{ float: 'right', fontSize: '0.75rem', height: '100%' }} onClick={toggleImportance}>{label}</button>
        </li>
    );
};

export default NoteInfo;