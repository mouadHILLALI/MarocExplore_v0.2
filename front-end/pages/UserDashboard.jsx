import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";   

import Anavbar from "../components/authNavbar.jsx";
const Dashboard = () => {
const [categories, setCategories] = useState([]);
useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost/api/Categories/show");
        setCategories(response.data);
        console.log(response.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); 

  console.log(categories); 
  return (
    <div className="bg-[#fae6cf] h-[100vh]">
      <Anavbar />
      <button className="p-2 m-auto border-2 border-black rounded-[15px] m-6">Create a trajectory</button>
      <form className="fixed top-[30%] left-[40%] flex flex-col justify-between h-[60vh] p-4 bg-[#e36e02] border-2 border-black rounded-[15px]">
        <h2 className="font-bold text-xl">Add a trajectory : </h2>
        <input className="rounded-[15px] p-2" type="text" name="title" />
        <input className="rounded-[15px] p-2" type="date" name="start_date" />
        <input className="rounded-[15px] p-2" type="date" name="end_date" />
        <input className="rounded-[15px] p-2" type="file" name="image" />
        <select className="rounded-[15px] p-2" name="category_id">

        </select>
        <button className="font-bold text-xl">cancel</button>
      </form>
    </div>
  );
};

export default Dashboard;
