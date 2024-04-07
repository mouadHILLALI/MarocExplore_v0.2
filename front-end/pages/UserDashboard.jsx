import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Anavbar from "../components/authNavbar.jsx";
import Trajectory from "../components/trajectories.jsx";
const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [category_id, setCategory_id] = useState(null);

  let image = document.getElementById("image");

 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost/api/categories/show"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("start_date", start_date);
    form.append("end_date", end_date);
    if (image.files && image.files[0]) {
      form.append("image", image.files[0]);
    }
    form.append("category_id", category_id);
    setTitle("");
    setStart_date("");
    setEnd_date("");
    setCategory_id(null);

    try {
      const res = await axios.post(
        "http://localhost/api/Trajectory/Create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#fae6cf] h-[100vh]">
      <Anavbar />
      <button
        onClick={() => {
          setShow(true);
        }}
        className="p-2 m-auto border-2 border-black rounded-[15px] m-[5%] "
      >
        Create a trajectory
      </button>

      {show && (
        <form
          encType="multipart/form/data"
          onSubmit={handleForm}
          className=" left-[25%] gap-1 md:left-[39%] fixed top-[10%]  flex flex-col justify-between  p-4 bg-[#e36e02]  border-2 border-black rounded-[15px] overflow-y"
        >
          <h2 className="font-bold text-xl">Add a trajectory : </h2>
          <input
            className="rounded-[15px] p-2"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
            name="title"
          />
          <input
            className="rounded-[15px] p-2"
            onChange={(e) => {
              setStart_date(e.target.value);
            }}
            value={start_date}
            type="date"
            name="start_date"
          />
          <input
            className="rounded-[15px] p-2"
            onChange={(e) => {
              setEnd_date(e.target.value);
            }}
            value={end_date}
            type="date"
            name="end_date"
          />
          <input
            className="rounded-[15px] p-2"
            type="file"
            name="image"
            id="image"
          />
          <select
            className="rounded-[15px] p-2"
            onChange={(e) => {
              setCategory_id(e.target.value);
            }}
            value={category_id}
            name="category_id"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit" className="font-bold text-xl">
            Add
          </button>
          <button
            onClick={() => {
              setShow(false);
            }}
            className="font-bold text-xl"
          >
            cancel
          </button>
        </form>
      )}
      <Trajectory />
    </div>
  );
};

export default Dashboard;
