type Props = {
    text: string;
    value: number;
}

const StatisticLine: React.FC<Props> = ({ text, value }) => {
    return (
        <>
            <p>{text}: {value}</p> {/* {isNaN(value) ? '-%' : value * 100} */}
        </>
    );
}

export default StatisticLine