import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const submitForm = async(e)=>{
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost/api/User/Login", form);
        console.log('Wait while authenticating...');
        console.log('logged in successfully');
        setEmail("");
        setPassword("");
        const token = res.data.token;
        localStorage.setItem('token', token);
        navigate("/dashboard");
    } catch (error) {
        console.log('something unexpected occured');
    }
};
  return (
    <div className="bg-[#fae6cf] h-[100vh] flex">
      <form onSubmit={submitForm} className=" w-[30%] h-[40%] flex flex-col m-auto justify-between">
        <input
          type="email"
          name="email"
          className=" p-3 rounded-[15px]"
          placeholder="Enter your email:"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          className=" p-3 rounded-[15px]"
          placeholder="Enter your password:"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
