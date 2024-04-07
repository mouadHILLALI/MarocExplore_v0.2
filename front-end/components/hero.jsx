import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const [category_id, setCategory_id] = useState(null);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [trajectories, setTrajectories] = useState([]);
  const [Filter, setFilter] = useState(null);
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

  useEffect(() => {
    const fetchtraj = async () => {
      try {
        const res = await axios.get("http://localhost/api/Trajectory/all");
        setTrajectories(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetching data");
      }
    };
    fetchtraj();
  }, []);

  const filter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost/api/Trajectory/Filter", {
        params: {
          filter: Filter,
        },
      });
      setTrajectories(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-[50%] mt-7   m-auto justify-between h-[40vh]">
        <p className="text-6xl font-bold text-center w-[80%] ">
          Turn your road trip into an adventure.
        </p>
        <div className="flex justify-around">
          <form className="flex gap-2">
            <input
              className="py-2 px-4 rounded-[15px]"
              type="search"
              placeholder="search by title ..."
              name="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="bg-green-600 rounded-[20px] p-3 " type="submit">
              search
            </button>
          </form>

          <form onSubmit={filter} className="flex gap-2">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="py-2 px-4 rounded-[15px] bg-[#fae6cf]"
            >
              {categories.map((category, index) => (
                <option name="filter" key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
              <option value="all" name="filter">
                All
              </option>
              <option selected disabled hidden>
                filter by category
              </option>
            </select>
            <button className="bg-orange-600 rounded-[20px] p-3" type="submit">
              filter
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 w-[70%] m-auto mt-7 border-2 h-[50vh] border-black p-3 rounded-[20px] ">
        {trajectories &&
          trajectories.map((trajectory, index) => {
            return (
              <div className="flex flex-col" key={index}>
                <h1>{trajectory.title}</h1>
                <img
                  className="w-[15%] h-[50%] rounded-[15px]"
                  src={trajectory.image}
                  alt="..."
                />
                <div>
                  <span>{trajectory.start_date}</span>{" "}
                  <span>{trajectory.end_date}</span>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Hero;
