type Props = {
    message: string | null;
}

const Notification: React.FC<Props> = ({ message }) => {
    if (message === null) {
        return null;
    }

    return (
        <div style={{ color: 'red', fontSize: '1rem', borderStyle: 'solid', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
            {message}
        </div>
    );
};

export default Notification;