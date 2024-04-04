import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Trajectory = () => {
    const token = localStorage.getItem("token");
    const [trajectories, setTrajectories] = useState([]);
    useEffect(() => {
        const fetchTrajectories = async () => {
          try {
            const res = await axios.get("http://localhost/api/Trajectory/Show",{ headers: {
                Authorization: `Bearer ${token}`,
              },});
            setTrajectories(res.data.content);
    
          } catch (error) {
            console.log(error);
          }
        };
        fetchTrajectories();
      }, []);
    return <>
    <div className="w-[80%] h-[30%] border-2 border-black rounded-[15px] m-auto mt-7 ">
      {
        trajectories.map((trajectory) => (
            <div key={trajectory.id} className="w-[40%] m-4 border-2 border-black rounded-lg">
              <h1>{trajectory.title}</h1>
            </div>
          ))
      }
    </div>
    </>

}

export default Trajectory ;