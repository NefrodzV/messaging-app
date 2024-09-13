import UserProvider from '../providers/UserProvider';

export function withUserProvider(component) {
    return <UserProvider>{component}</UserProvider>;
}
