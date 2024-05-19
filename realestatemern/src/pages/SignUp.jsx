import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  console.log({ userName, email, password });
      const response = await axios.post(
        "http://localhost:5000/api/user/sign-up",
        {
          userName,
          email,
          password,
        }
      );
      console.log(response.data.message);
      console.log(response.data?.user);
      if (response.status === 200) {
        toast.success("SignUp success");
      }
      if (response.status === 400) {
        toast.error(response.data?.message || "Error");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <div className="flex items-center border justify-center min-h-screen">
      <form onSubmit={(e) => handleSubmit(e)} className="border p-5">
        <h1 className="  font-medium text-3xl  text-orange-400 p-3 text-center">
          SignUp
        </h1>
        <div className="py-4 gap-4 text-xl flex items-center">
          <label className="px-2">Email</label>
          <input
            type="email"
            value={email}
            className="border text-lg p-3"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="py-4 flex text-xl gap-4 items-center">
          <label className="">Password</label>
          <input
            type="password"
            value={password}
            className="border text-xl p-3"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="py-4 gap-4 text-xl flex items-center">
          <label className="px-2">Name:</label>
          <input
            type="text"
            value={userName}
            className="border text-lg p-3"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button className="border p-3 shadow-lg hover:scale-105  text-white bg-orange-300 hover:opacity-90 rounded-lg font-medium text-xl ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
