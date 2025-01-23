export default function Content({ content }) {
    console.log(content);
    return (
        <p>{content.name} - {content.exercises}</p>
    );
}