import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const UserCategoryListing = () => {
  const user = useSelector((state) => state.user.currentUser);
  const fetchUserCategoryListing =async () => {
    try {
        const response=await axios.get()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      UserCategoryListing:{user.email}:{user._id}
    </div>
  );
};

export default UserCategoryListing;
