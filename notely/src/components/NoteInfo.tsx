import { Note } from "../main";

type Props = {
    note: Note;
}

const NoteInfo: React.FC<Props> = ({ note }) => {
    return (
        <li>{note.content}</li>
    );
};

export default NoteInfo;