export default function CenteredWrapper({ text }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'red',
            }}
        >
            {text}
        </div>
    );
}
