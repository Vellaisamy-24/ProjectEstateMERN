import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  const deleteCategoryListing = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/data/deleteCategoryListingById/${id}`
      );
      fetchUserCategoryListing();
      console.log(response);
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
            <div key={index} className="py-5 px-2 border">
              <div className="flex flex-col items-center gap-4 justify-center relative">
                <Link
                  to={`/updateCategoryListing/${data._id}`}
                  className=" flex left-0 absolute px-40"
                >
                  Update
                </Link>
                <button
                  onClick={(e) => deleteCategoryListing(data._id)}
                  className="flex right-0 absolute px-20"
                >
                  Delete
                </button>
              </div>

              <div>
                <div className="flex gap-4  flex-wrap">
                  {data.images &&
                    data.images.map((img) => (
                      <div className="p-10">
                        <img
                          src={img}
                          className="w-30 h-10 rounded-sm shadow-lg"
                        />
                      </div>
                    ))}
                </div>

                <div className="px-10 flex flex-col gap-2 ">
                  <h1> Name: {data.name}</h1>
                  <p>Description: {data.description}</p>
                  <span>Address:{data.address}</span>
                  <div className="flex gap-8 flex-wrap">
                    <span>BedRooms:{data.bedRooms}</span>
                    <span>BathRooms:{data.bathRooms}</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <span>
                      <input type="checkbox" checked={data.offer} />
                      Offer
                    </span>
                    <span>
                      <input type="checkbox" checked={data.parking} />
                      Parking
                    </span>
                    <span>
                      <input type="checkbox" checked={data.furnished} />
                      Furnished
                    </span>
                    <span>
                      <input type="checkbox" checked={data.rent} />
                      Rent
                    </span>
                    <span>
                      <input type="checkbox" checked={data.sell} />
                      Sell
                    </span>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <span>
                      RegularPrice:
                      <input
                        type="number"
                        className="border"
                        value={data.regularPrice}
                      />
                    </span>
                    <span>
                      DiscountPrice:
                      <input
                        type="number"
                        className="border"
                        value={data.discountPrice}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserCategoryListing;
