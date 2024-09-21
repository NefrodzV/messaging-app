import { useLoaderData, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
// Returns a specific chat with id
export default function useChat() {
    const [chat, setChat] = useState(useLoaderData());

    return { chat };
}
