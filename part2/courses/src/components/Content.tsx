import { Part } from "./Course";
import Line from "./Line";

type Props = {
    parts: Part[]
}

const Content: React.FC<Props> = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Line key={part.id} name={part.name} exercises={part.exercises} />)}
            <p>Total of {parts.reduce((sum, part) => sum += part.exercises, 0)} exercises</p>
        </>
    );
};

export default Content;