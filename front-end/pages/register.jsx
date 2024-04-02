const Register = () => {
  return (
    <div className="bg-[#fae6cf] h-[100vh] ">
      <form className=" w-[50%] flex flex-col m-auto">
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="password" name="password" />
      </form>
    </div>
  );
};

export default Register;
