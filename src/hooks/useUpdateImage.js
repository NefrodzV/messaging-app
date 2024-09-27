import { useEffect, useState } from 'react';
import useUser from './useUser';

export default function useUpdateImage() {
    const { user, setUser } = useUser();
    const [status, setStatus] = useState();
    const [errors, setErrors] = useState(null);

    async function upload(file) {
        try {
            setStatus('pending');
            const formData = new FormData();
            formData.append('image', file);
            const response = await fetch(
                import.meta.env.VITE_API + '/users/me/image',
                {
                    method: 'PUT',
                    body: formData,
                    mode: 'cors',
                    credentials: 'include',
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setErrors(data.errors);
                setStatus('error');
                return;
            }
            setStatus('success');
            setUser((prev) => ({ ...prev, image: data.image }));
        } catch (e) {
            console.log(e);
            setStatus('error');
        }
    }

    return { status, errors, upload };
}
