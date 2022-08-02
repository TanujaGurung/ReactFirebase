import { useNavigate } from "react-router-dom"

const Protected = ({ isLogged, children }) => {
    const navigate = useNavigate()
    if (!isLogged) {
        navigate("/")
    }
    return children
}
export default Protected