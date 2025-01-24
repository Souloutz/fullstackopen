import Content from "./Content";
import Header from "./Header";

export interface Part {
    name: string;
    exercises: number;
    id: number;
}

interface Course {
    id: number;
    name: string;
    parts: Part[]
}

type Props = {
    course: Course;
}

const Course: React.FC<Props> = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    );
}

export default Course;