import { useState } from "react";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (e) =>{
    e.preventDefault();
    
  }
  return (
    <div className="bg-[#fae6cf] h-[100vh] flex ">
      <form onSubmit={submitForm} className=" w-[30%] h-[40%] flex flex-col m-auto justify-between">
        <input
          type="text"
          name="name"
          className=" p-3 rounded-[15px]"
          placeholder="Enter your name:"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />
        <input
          type="email"
          name="email"
          className=" p-3 rounded-[15px]"
          placeholder="Enter your email:"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <input
          type="password"
          name="password"
          className=" p-3 rounded-[15px]"
          placeholder="Enter your password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <div className="w-full">
            <button className="w-full p-2 bg-[#464553] rounded-lg text-white font-bold ">
                Register
            </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
