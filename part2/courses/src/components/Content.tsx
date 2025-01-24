import { Part } from "./Course";
import Line from "./Line";

type Props = {
    parts: Part[]
}

const Content: React.FC<Props> = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Line key={part.id} name={part.name} exercises={part.exercises} />)}
        </>
    );
};

export default Content;