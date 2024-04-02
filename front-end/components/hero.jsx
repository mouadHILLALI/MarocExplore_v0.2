import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col w-[40%] m-auto justify-between h-[40vh]  ">
        <p className="text-6xl font-bold">Turn your road trip into an adventure.</p>
        <div className="flex justify-around">
        <form>
            <input className="py-2 px-4 rounded-[15px] " type="search" placeholder="search by title ..." name="search" />
        </form>
        <select className="py-2 px-4 rounded-[15px] bg-[#fae6cf] ">
        <option value="">filter by category</option>
        </select>
        </div>
      </div>
    </>
  );
};

export default Hero;
