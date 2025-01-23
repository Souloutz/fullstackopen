import StatisticLine from "./StatisticLine";

type Props = {
    good: number;
    neutral: number;
    bad: number;
    total: number;
}

const Statistics: React.FC<Props> = ({ good, neutral, bad, total }) => {
    return (
        <>
            {total === 0 ? <p style={{ marginTop: '3rem' }}>No feedback given</p> : 
            <div>
                <h1>Statistics</h1>
                <StatisticLine text="Good" value={good} />
                <StatisticLine text="Neutral" value={neutral} />
                <StatisticLine text="Bad" value={bad} />
                <StatisticLine text="Total" value={total} />
                <StatisticLine text="Average" value={total / 3} />
                <StatisticLine text="Positive" value={good / total} />
            </div>}
        </>
    );
}

export default Statistics;