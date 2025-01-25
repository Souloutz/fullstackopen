type Props = {
    inputName: string;
    inputNumber: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setNewName: React.Dispatch<React.SetStateAction<string>>;
    setNewNumber: React.Dispatch<React.SetStateAction<string>>;
}

const Form: React.FC<Props> = ({ inputName, inputNumber, handleSubmit, setNewName, setNewNumber }) => {
    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }}onSubmit={(e) => handleSubmit(e)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <div>
                        Name: <input value={inputName} onChange={e => setNewName(e.target.value)}/>
                    </div>
                    <div>
                        Number: <input value={inputNumber} onChange={e => setNewNumber(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <button type='submit'>Add</button>
                </div>
            </form>
        </>
    );
}

export default Form;