
import { useNavigate } from "react-router-dom"

export default function HomePage() {
    const navigate = useNavigate()
    navigate('/signup')
    return <div>Homepage</div>
}