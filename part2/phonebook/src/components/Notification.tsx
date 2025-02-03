type Props = {
    message: string | null;
    color: string;
}

const Notification: React.FC<Props> = ({ message, color }) => {
    if (message === null)
        return null;

    return (
        <div style={{ color: color, fontSize: '1em', border: 'solid', borderRadius: '20px', backgroundColor: 'lightgray', width: 'fit-content', padding: '0.5rem 1rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {message}
        </div>
    );
};

export default Notification;