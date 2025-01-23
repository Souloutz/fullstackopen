type Props = {
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>{text}</button>
    );
}

export default Button;