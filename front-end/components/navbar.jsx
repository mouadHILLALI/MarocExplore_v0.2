import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <>
        <div className="flex items-center justify-between ">
            <h1 className=" p-2 text-3xl font-bold w-[40%] ">MarocExplore.</h1>
            <div className="w-[40%] flex gap-6 justify-center mt-4 ">
            <NavLink to="/register" className=" text-[#3e9253] hover:text-black font-bold">Register</NavLink>
            <NavLink to="/login" className="text-[#3e9253] hover:text-black font-bold">Login</NavLink>
            </div>
        </div>
        </>
    );
}

export default Navbar ;