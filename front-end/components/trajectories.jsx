import axios from "axios";
import { useState, useEffect } from "react";

const Trajectory = () => {
  const token = localStorage.getItem("token");
  const [trajectories, setTrajectories] = useState([]);

  useEffect(() => {
    const fetchTrajectories = async () => {
      try {
        const res = await axios.get("http://localhost/api/Trajectory/Show", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrajectories(res.data.trajectories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrajectories();
  }, []);

  const deleteTrajectory = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost/api/Trajectory/Delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setTrajectories(
        trajectories.filter((trajectory) => trajectory.id !== id)
      );
      fetchTrajectories();
    } catch (error) {
      console.error("Error deleting trajectory:", error);
    }
  };

  return (
    <>
      <div className="w-[80%] h-[30%] border-2 border-black rounded-[15px] m-auto mt-7 ">
        {trajectories.map((trajectory) => (
          <div
            key={trajectory.id}
            className="w-[40%] m-4 border-2 border-black rounded-lg"
          >
            <h1>{trajectory.title}</h1>
            <img src={trajectory.image} alt="..." />
            <h3>Start date: {trajectory.start_date}</h3>
            <h3>End date: {trajectory.end_date}</h3>
            <div className="flex items-center w-full ">
              <button
                onClick={() => deleteTrajectory(trajectory.id)}
                className="font-bold p-2 bg-red-500 rounded-[15px] border-2 border-black"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Trajectory;
