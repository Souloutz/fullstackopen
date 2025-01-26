const Footer: React.FC = () => {
    const footerStyle = {
        color: 'lightblue',
        fontStyle: 'italic',
        fontSize: '1.5em'
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Notely App, Howard Kong, 2025</em>
        </div>
    );
};

export default Footer;