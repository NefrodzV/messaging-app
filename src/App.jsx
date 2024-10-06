import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        document.title = 'Messaging App';
    }, []);
    return <RouterProvider router={router} />;
}

export default App;
