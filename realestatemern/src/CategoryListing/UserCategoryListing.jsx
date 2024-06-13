import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserCategoryListing = () => {
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    fetchUserCategoryListing();
  }, [user]);
  const [userCategoryListing, setUserCategoryListing] = useState([]);
  const fetchUserCategoryListing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/data/getUserCategoryListing/${user._id}`
      );
      console.log(response);
      setUserCategoryListing(response.data?.userCategoryListing);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* UserCategoryListing:{user.email}:{user._id} */}
      <div>
        <h1>UserCategoryListing</h1>
        {userCategoryListing &&
          userCategoryListing.map((data, index) => (
            <div className="py-5 px-2">
              {data.name}
              {data.description}
              {data.address}
              {data.images && data.images.map((img)=>
            (
                <>
                <img src={img} className="w-10 h-10"/></>
            ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserCategoryListing;
