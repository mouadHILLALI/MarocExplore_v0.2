import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const [category_id, setCategory_id] = useState(null);
  const [categories, setCategories] = useState([]);
  
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
  
  return (
    <>
      <div className="flex flex-col w-[40%] m-auto justify-between h-[40vh]">
        <p className="text-6xl font-bold">
          Turn your road trip into an adventure.
        </p>
        <div className="flex justify-around">
          <form className="flex">
            <input
              className="py-2 px-4 rounded-[15px]"
              type="search"
              placeholder="search by title ..."
              name="search"
            />
            <button type="submit">search</button>
          </form>

          <form className="flex">
          <select className="py-2 px-4 rounded-[15px] bg-[#fae6cf]">
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
            <option selected disabled hidden>filter by category</option>
          </select>
          <button type="submit">filter</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Hero;
