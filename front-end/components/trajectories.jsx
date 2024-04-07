import axios from "axios";
import { useState, useEffect, useRef } from "react";

const Trajectory = () => {
  const token = localStorage.getItem("token");
  const [trajectories, setTrajectories] = useState([]);
  const [destinationFields, setDestinationFields] = useState([]);
  const [show, setShow] = useState(false);
  const TrajectoryID = useRef(0);
  const [city, setCity] = useState("");
  const [hotel, setHotel] = useState("");
  const [food, setFood] = useState("");
  const [monument, setMonument] = useState("");
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
      await axios.delete(`http://localhost/api/Trajectory/Delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrajectories(
        trajectories.filter((trajectory) => trajectory.id !== id)
      );
    } catch (error) {
      console.error("Error deleting trajectory:", error);
    }
  };

  const addDestinationField = (e) => {
    setDestinationFields([...destinationFields, {}]);
    setShow(true);
    TrajectoryID.current = e.target.value;
    e.preventDefault();
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const fields = [...destinationFields];
    fields[index][name] = value;
    setDestinationFields(fields);
    switch (name) {
      case "city":
        setCity(value);
        break;
      case "hotel":
        setHotel(value);
        break;
      case "food":
        setFood(value);
        break;
      case "monument":
        setMonument(value);
        break;
      default:
        break;
    }
  };

  const adddest = async (e) => {
    e.preventDefault();
    let id = TrajectoryID.current;
    try {
      const formDataArray = destinationFields.map(field => ({
        city: field.city,
        hotel: field.hotel,
        food: field.food,
        monument: field.monument,
      }));
  
      const res = await axios.post(
        `http://localhost/api/Destination/Create/${id}`,
        formDataArray,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const VisitList= async(e)=>{
    let id = e.target.value;
    console.log(id);
    const form = new FormData();
    form.append("id", id);
    try {
      const res = await axios.post("http://localhost/api/visitlist/Create",form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-[80%] h-[30%] border-2 border-black rounded-[15px] m-auto mt-7 ">
        {trajectories.map((trajectory, index) => (
          <div
            key={trajectory.id}
            className="w-[40%] m-4 border-2 border-black rounded-lg"
          >
            <div className="flex justify-between gap-2 items-center m-2">
              <button key={index} onClick={VisitList} value={trajectory.id} className="p-2 bg-blue-600 rounded-[15px]  ">Add to visit List</button>
            <h1>{trajectory.title}</h1>
            </div>
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
              <button
                key={trajectory.id}
                value={trajectory.id}
                onClick={addDestinationField}
                className="font-bold p-2 bg-red-500 rounded-[15px] border-2 border-black"
              >
                Add Destination
              </button>
            </div>
          </div>
        ))}
      </div>
      {show && (
        <div
          id="fields"
          className="flex flex-col w-[40%] m-auto justify-between h-[40%] bg-orange-400 fixed top-[15%] left-[30%] p-2 rounded-[15px] overflow-auto	 "
        >
          <form className="flex flex-col">
            {destinationFields.map((field, index) => (
              <div className="flex flex-col" key={index}>
                <input
                  type="text"
                  name="city"
                  value={field.city || ""}
                  placeholder="enter the city"
                  className=" p-2 rounded-[15px]"
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="text"
                  name="hotel"
                  value={field.hotel || ""}
                  placeholder="enter the hotel"
                  className=" p-2 rounded-[15px]"
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="text"
                  name="monument"
                  value={field.monument || ""}
                  placeholder="enter the monument"
                  className=" p-2 rounded-[15px]"
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="text"
                  name="food"
                  value={field.food || ""}
                  placeholder="enter the food"
                  className=" p-2 rounded-[15px]"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            ))}
            <button
              onClick={() => {
                setShow(false);
              }}
            >
              cancel
            </button>
            <button onClick={addDestinationField}>Add another field</button>
            <button
              onClick={(e) => {
                adddest(e);
              }}
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Trajectory;
