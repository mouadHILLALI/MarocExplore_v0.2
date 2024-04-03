import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    console.log(localStorage.getItem("token"));
    const logout = (e) => {
        const token = localStorage.getItem("token");
        axios.post('http://localhost/api/User/logout', token);
        navigate("/");
    }
    return <>
    <h1>dash</h1>
    <button onClick={logout}>Logout</button>
    </> 

}

export default Dashboard