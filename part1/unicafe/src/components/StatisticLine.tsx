type Props = {
    text: string;
    value: number;
}

const StatisticLine: React.FC<Props> = ({ text, value }) => {
    return (
        <>
            <tr>
                <td>{text}: {value}</td>
            </tr>
        </>
    );
}

export default StatisticLine