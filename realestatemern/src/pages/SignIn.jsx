import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../store/Features/userSlice";
import OAuth from "../components/OAuth";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/sign-in",
        {
          email,
          password,
        }
      );
      console.log(response.data?.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSignIn = async (e) => {
    console.log("clicked");
    e.preventDefault();
    try {
      console.log({ email, password });
      const response = await axios.post(
        "http://localhost:5000/api/user/sign-in",
        {
          email,
          password,
        }
      );
      console.log(response.data.message);
      console.log(response.data?.user);
      dispatch(
        signIn({ email: response.data.user.email, _id: response.data.user._id })
      );
      if (response.status === 200) {
        toast.success("SignUp success");
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
      if (response.status === 404) {
        toast.error(response.data?.message || "Error");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <div className="flex items-center border justify-center min-h-screen">
      {/* <button onClick={button}>clic</button> */}
      <section className="border p-5">
        <h1 className="  font-bold text-3xl  text-orange-400 p-3 text-center">
          SignIn
        </h1>
        <form
          onSubmit={(e) => handleSignIn(e)}
          className="py-4 gap-4 text-xl flex flex-col items-center"
        >
          <div className="flex py-4 items-center gap-4">
            <label className="px-2">Email</label>
            <input
              required
              type="email"
              value={email}
              className="border text-lg p-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="py-4 flex items-center text-xl gap-4 ">
            <label className="">Password</label>
            <input
              required
              type="password"
              value={password}
              className="border text-xl p-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              // onClick={(e) => handleSubmit(e)}
              className="border p-3 shadow-lg hover:scale-105  text-white bg-orange-300 hover:opacity-90 rounded-lg font-medium text-xl "
            >
              Submit
            </button>
          </div>
        </form>
        <hr className="my-2" />
        <div className="flex mx-auto items-center hover:opacity-85 hover:scale-100  bg-green-400 rounded-lg p-3 text-white font-medium text-xl  justify-center">
          <OAuth />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
