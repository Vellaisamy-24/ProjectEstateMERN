// import axios from "axios";
// import { ChevronDown, ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import axios from "axios";

import { useParams } from "react-router-dom";
import {
  BathIcon,
  BedDouble,
  ChevronLeft,
  IndianRupee,
  ParkingCircleIcon,
  ParkingCircleOffIcon,
  ShieldCheckIcon,
  ShieldOffIcon,
} from "lucide-react";

import { X } from "lucide-react";
import { Check } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      setTimeout(() => {
        toast.success("Deleted");
      }, 300);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <div>
      {/* UserCategoryListing:{user.email}:{user._id} */}
      <section className="w-full flex fixed items-center top-0 bg-white z-10 py-3 border-b">
        <button
          onClick={back}
          className="flex ml-2 rounded-lg items-center gap-1 p-2 border "
        >
          <ChevronLeft />
          Back
        </button>
        <h1 className=" text-orange-500 text-lg flex mx-auto items-center  justify-center font-bold">
          Your Listing
        </h1>
      </section>

      <section className="px-2 lg:px-10 py-20">
        {/* <div className="border"> */}
        {userCategoryListing &&
          userCategoryListing.map((data, index) => (
            <div key={index}>
              <div className="py-3 border my-1 rounded-lg">
                <div className="flex px-2   py-2 gap-2">
                  {/* sm:w-[200px] sm:h-[150px] h-[100px] w-[130px] */}
                  <div className="w-1/2 sm:w-1/4 lg:w-1/6">
                    <img
                      src={data.images[0]}
                      className="rounded-lg w-full h-full oject-cover"
                    />
                  </div>

                  <div className="flex w-full sm:w-2/4 lg:w-1/2  flex-col sm:gap-4 lg:gap-6 gap-2">
                    <h1 className="flex  text-[14px] flex-wrap font-semibold">
                      {data.name}
                    </h1>
                    <p className="flex text-xs flex-wrap text-slate-600">
                      {data.description}
                    </p>
                    <div className="flex gap-3 sm:gap-4 md:gap-8">
                      <div className="flex items-center flex-col">
                        <BedDouble />
                        <p className="text-[9px] sm:text-xs text-neutral-400">
                          {data.bedRooms}Bed
                        </p>
                      </div>
                      <div className="flex items-center flex-col">
                        <BathIcon />
                        <p className="text-[9px] sm:text-xs text-neutral-400">
                          {data.bedRooms}Bath
                        </p>
                      </div>
                      {/* {JSON.stringify(parking)} */}
                      {data.parking ? (
                        <div className="flex flex-col items-center">
                          <ParkingCircleIcon />
                          <p className="text-[9px] sm:text-xs text-neutral-400">
                            Parking
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ParkingCircleOffIcon />
                          <p className="text-[9px] sm:text-xs text-neutral-400">
                            Parking
                          </p>
                        </div>
                      )}
                      {data.parking ? (
                        <div className="flex flex-col items-center">
                          <ShieldCheckIcon />
                          <p className="text-[9px] sm:text-xs text-neutral-400">
                            Furnish
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ShieldOffIcon />
                          <p className="text-[9px] sm:text-xs text-neutral-400">
                            Furnish
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="px-2 stroke-1 stroke-slate-400 " />
                <div className="flex py-3 flex-col px-2 gap-3">
                  <span className="flex items-center gap-2">
                    <CiLocationOn className="fill-orange-500 " />
                    <p className="text-xs flex flex-wrap">{data.address}</p>
                  </span>
                  <div className="flex gap-2">
                    <div>
                      {data.sell ? (
                        <div className="  inline-flex justify-between border  rounded-md p-2 items-center gap-1">
                          <Check size={20} className="text-green-500" />
                          <p className="text-xs">Sell</p>
                        </div>
                      ) : (
                        <div className=" inline-flex justify-between border p-2 rounded-md  items-center gap-1">
                          <X size={20} className="text-red-500" />
                          <p className="text-xs">Sell</p>
                        </div>
                      )}
                    </div>
                    <div className="">
                      {data.offer ? (
                        <div className="inline-flex justify-between rounded-md  border p-2  items-center gap-1">
                          <Check size={20} className="text-green-500" />
                          <p className="text-xs">Offer</p>
                        </div>
                      ) : (
                        <div className="inline-flex justify-between rounded-md  border p-2  items-center gap-1">
                          <X size={20} className="text-red-500" />
                          <p className="text-xs">Offer</p>
                        </div>
                      )}
                    </div>
                    <div className="">
                      {data.rent ? (
                        <div className="inline-flex border p-2 rounded-md items-center gap-1">
                          <Check size={20} className="text-green-500" />
                          <p className="text-xs">Rent</p>
                        </div>
                      ) : (
                        <div className="inline-flex justify-between border p-2 rounded-md items-center gap-1">
                          <X size={20} className="text-red-500" />
                          <p className="text-xs">Rent</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="flex text-[15px] items-center gap-1">
                    Price:
                    <p className="flex items-center text-xs text-neutral-500">
                      <IndianRupee size={12} />
                      {data.regularPrice}
                    </p>
                  </span>
                  <span className="flex text-[15px] items-center gap-1">
                    Discount:
                    <p className="flex items-center text-xs text-neutral-500">
                      <IndianRupee size={12} />
                      {data.discountPrice}
                    </p>
                  </span>
                  {/* <span>Discount:{data.discountPrice}</span> */}{" "}
                  <div className="flex pt-5  items-center justify-between relative">
                    <Link
                      to={`/updateCategoryListing/${data._id}`}
                      className=" left-0 hover:border hover:border-white/80 hover:bg-opacity-85 px-5 border py-1 rounded-lg text-white bg-orange-400  absolute "
                    >
                      Update
                    </Link>
                    <button
                      onClick={(e) => deleteCategoryListing(data._id)}
                      className="flex hover:border hover:border-white/80 hover:bg-opacity-85 px-5 border py-1 rounded-lg bg-red-500 text-white right-0 absolute "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* </div> */}
      </section>
    </div>
  );
};

export default UserCategoryListing;
