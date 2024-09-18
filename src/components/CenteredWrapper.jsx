export default function CenteredWrapper({ text, style }) {
    return (
        <div
            style={
                style || {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'red',
                    position: 'absolute',
                    inset: 0,
                }
            }
        >
            {text}
        </div>
    );
}
