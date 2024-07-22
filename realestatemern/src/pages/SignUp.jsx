import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
        setTimeout(() => {
          navigate("/sign-in");
        }, 500);
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
    <section className="">
      <img
        src="./realEstate.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black w-24 opacity-80 via-transparent to-transparent rounded-md" />
      <div className="absolute inset-0 bg-gradient-to-tl from-black  opacity-30 via-transparent to-transparent rounded-md" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black  opacity-30 via-transparent to-transparent rounded-md" />
      <div className="absolute inset-0 bg-gradient-to-bl from-black  opacity-30 via-transparent to-transparent rounded-md" />
      <div className="flex items-center border  justify-center   min-h-screen relative">
        {/* <button onClick={button}>clic</button> */}

        <section className=" rounded-2xl shadow-xl   bg-black/45 md:bg-black/55 bg-opacity-100  p-7 md:p-5">
          <h1 className="  font-medium text-xl  text-[#FFF1DB] p-3 text-center">
            SignIn
          </h1>
          <form
            onSubmit={(e) => handleSignIn(e)}
            className="py-4 gap-4 text-xl flex flex-col items-center"
          >
            <div className="flex flex-col md:flex-row py-1 md:py-4 md:items-center gap-2 md:gap-4">
              <label className="px-2 text-orange-500  text-[13px] md:text-[15px] font-semibold">
                Email
              </label>
              <input
                required
                type="email"
                value={email}
                className=" outline-none text-neutral-600  font-medium text-xs md:text-[15px] bg-white/75 rounded-sm md:rounded-lg px-2 py-1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row py-1 md:py-4 md:items-center gap-2 md:gap-4">
              <label className="px-2 text-orange-500 text-[13px] md:text-[15px] font-semibold">
                Name
              </label>
              <input
                required
                type="text"
                value={userName}
                className=" outline-none text-neutral-600 font-medium text-xs md:text-[15px] bg-white/75 rounded-sm md:rounded-lg px-2 py-1"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="md:py-4 py-1 flex flex-col md:flex-row md:items-center text-xl gap-2 md:gap-4 ">
              <label className="text-orange-500 font-semibold text-[13px] md:text-[15px]">
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                className=" outline-none text-neutral-600 font-medium text-xs md:text-[15px] bg-white/75 rounded-sm md:rounded-lg py-1 px-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                // onClick={(e) => handleSubmit(e)}
                className=" py-1 px-3 shadow-lg hover:scale-105   bg-[#FF7777] text-white hover:opacity-90 rounded-lg font-normal text-[14px] "
              >
                Submit
              </button>
            </div>
          </form>
          {/* <hr className="my-2" /> */}
          {/* <div className="flex items-center mx-auto  hover:opacity-85 hover:scale-100  bg-[#EF5A6F] rounded-lg p-2 text-white font-normal text-[14px]  justify-center">
            <OAuth />
          </div> */}
        </section>
      </div>
    </section>
  );
};

export default SignUp;
