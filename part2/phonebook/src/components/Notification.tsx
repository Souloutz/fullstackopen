type Props = {
    message: string | null;
}

const Notification: React.FC<Props> = ({ message }) => {
    if (message === null)
        return null;

    return (
        <div style={{ color: 'forestgreen', fontSize: '1em', border: 'solid', borderRadius: '20px', backgroundColor: 'lightgray', width: 'fit-content', padding: '0.5rem 1rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {message}
        </div>
    );
};

export default Notification;