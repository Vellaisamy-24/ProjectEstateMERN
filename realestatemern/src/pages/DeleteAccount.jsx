import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../store/Features/userSlice";
const DeleteAccount = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteUserAccount = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/deleteUser/${user._id}`
      );
      toast.success("Account Deleteed");
      dispatch(deleteAccount());
      setTimeout(() => {
        navigate("/");
      }, 500);
      console.log(response.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={(e) => deleteUserAccount()}>DeleteAccount</button>
    </div>
  );
};

export default DeleteAccount;
