import { Note } from "../services/notes";

type Props = {
    note: Note;
    toggleImportance: React.MouseEventHandler<HTMLButtonElement>
}

const NoteInfo: React.FC<Props> = ({ note, toggleImportance }) => {
    const label = note.important ? 'Mark Not Important' : 'Mark Important';

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <li style={{ textAlign: 'left' }}>
                <span>{note.content}</span>
            </li>
            <button style={{ fontSize: '0.75rem', height: '100%', padding: '3px 1rem' }} onClick={toggleImportance}>{label}</button>
        </div>
    );
};

export default NoteInfo;