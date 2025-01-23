type Props = {
    good: number;
    neutral: number;
    bad: number;
    total: number;
}

const Statistics: React.FC<Props> = ({ good, neutral, bad, total}) => {
    return (
        <>
            {total === 0 ? <p style={{ marginTop: '3rem' }}>No feedback given</p> : 
            <div>
                <h1>Statistics</h1>
                <p>Good: {good}</p>
                <p>Neutral: {neutral}</p>
                <p>Bad: {bad}</p>
                <p>Total: {total}</p>
                <p>Average: {total / 3}</p>
                <p>Positive: {total !== 0 ? (good / total) * 100 : '-'}%</p>
            </div>}
        </>
    );
}

export default Statistics;