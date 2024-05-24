import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../store/Features/userSlice";
import { useNavigate } from "react-router-dom";
const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(signOut());
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  return (
    <div>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
export default SignOut;
