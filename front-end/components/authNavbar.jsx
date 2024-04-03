import axios from "axios";
import { useNavigate } from "react-router-dom";

const Anavbar = () => {
    const navigate = useNavigate();
    const logout = (e) => {
        const token = localStorage.getItem("token");
        axios.post('http://localhost/api/User/logout', token);
        navigate("/");
    }
    return <>
            <nav className="p-2 flex justify-between items-center">
                <h1 className="font-bold text-3xl" >MarocExplore.</h1>
                <button onClick={logout} className="text-[#3e9253] hover:text-black font-bold mr-3" >Logout</button>
            </nav>
    </>

}

export default Anavbar ;