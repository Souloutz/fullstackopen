type Props = {
    name: string;
    exercises: number;
}

const Line: React.FC<Props> = ({ name, exercises }) => {
    return <p>{name} - {exercises}</p>;
};

export default Line;