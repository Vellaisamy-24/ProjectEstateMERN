import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
const HomeCategoryListing = () => {
  useEffect(() => {
    fetchOfferCategoryListing();
  }, []);
  const [offerCategoryListing, setOfferCategoryListing] = useState([]);
  const [sellCategoryListing, setSellCategoryListing] = useState([]);
  const [rentCategoryListing, setRentCategoryListing] = useState([]);
  const fetchOfferCategoryListing = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/data/getCategoryListing?offer=true&limit=10"
      );
      // console.log(response);
      setOfferCategoryListing(response.data?.categoryListing);
      fetchRentCategoryListing();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRentCategoryListing = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/data/getCategoryListing?rent=true&limit=10"
      );
      // console.log(response);
      setRentCategoryListing(response.data?.categoryListing);
      fetchSaleCategoryListing();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSaleCategoryListing = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/data/getCategoryListing?sale=true&limit=10"
      );
      // console.log(response);
      setSellCategoryListing(response.data?.categoryListing);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <section>
        <h1 className=" px-5 text-orange-400 capitalize text-lg font-bold">
          Offers:
        </h1>
        <div className=" flex overflow-x-auto w-full  py-10 px-5 md:px-10 gap-8">
          {offerCategoryListing &&
            offerCategoryListing.map((data, index) => (
              <Link
                to={`/listing/${data._id}`}
                key={index}
                // className="border hover:cursor-pointer flex flex-col md:gap-4 gap-2  rounded-lg h-auto"
                // className="border-2 w-[150px] md:w-[300px] flex flex-col md:gap-4 gap-2  rounded-lg h-auto"
                className="border w-[150px] hover:bg-gradient-to-tr hover:border-black/20 from-slate-400/40 hover:scale-105 duration-300 transition-all md:w-[300px] flex flex-col md:gap-4 gap-2  rounded-lg h-auto"
              >
                <div className="md:w-[300px] md:h-[200px] w-[150px] h-[100px]">
                  {data.images && (
                    <>
                      <img
                        src={data.images[0]}
                        className="object-cover w-full rounded-tl-lg rounded-tr-lg  h-full"
                      />

                      {/* <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#151617] to-transparent rounded-b-md"></div> */}
                      {/* <div className=" inset-0 bg-gradient-to-tr from-black  opacity-10 via-transparent to-transparent rounded-md" />
                      <div className=" inset-0 bg-gradient-to-br from-black  opacity-90 via-transparent to-transparent rounded-md" />
                      <div className=" inset-0 bg-gradient-to-tl from-black  opacity-60 via-transparent to-transparent rounded-md" />
                      <div className=" inset-0 bg-gradient-to-br from-black  opacity-30 via-transparent to-transparent rounded-md" /> */}
                    </>
                  )}
                </div>

                <div className="px-2 py-1  flex flex-col gap-2">
                  <h1 className="flex items-center text-[14px] flex-nowrap md:text-[16px] gap-2 ">
                    <FaRegBuilding className="fill-orange-500" />
                    <p className="font-medium text-[13px] lg:text-[15px] truncate text-black">
                      {data.name}
                    </p>
                  </h1>
                  <div className="flex items-center   gap-2 text-xs">
                    <span>
                      <FaLocationArrow className="fill-green-400" />
                    </span>
                    <p className="flex truncate  text-xs text-neutral-800">
                      {data?.address}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <h1 className=" px-5 text-lg font-bold text-orange-400">Sell:</h1>
        <div className=" flex overflow-x-auto w-full  py-10 px-5 md:px-10 gap-8">
          {sellCategoryListing &&
            sellCategoryListing.map((data, index) => (
              <Link
                to={`listing/${data._id}`}
                key={index}
                className="border w-[150px] hover:bg-gradient-to-tr hover:border-black/20 from-slate-400/40 hover:scale-105 duration-300 transition-all md:w-[300px] flex flex-col md:gap-4 gap-2  rounded-lg h-auto"
              >
                <div className="md:w-[300px] md:h-[200px] w-[150px] h-[100px]">
                  {data.images && (
                    <>
                      <img
                        src={data.images[0]}
                        className="object-cover w-full rounded-tl-lg rounded-tr-lg  h-full"
                      />
                      {/* <div className=" inset-0 bg-gradient-to-tr from-black  opacity-10 via-transparent to-transparent rounded-md" />
                      <div className=" inset-0 bg-gradient-to-br from-black  opacity-90 via-transparent to-transparent rounded-md" />
                      <div className=" inset-0 bg-gradient-to-tl from-black  opacity-60 via-transparent to-transparent rounded-md" />
                      <div className=" inset-0 bg-gradient-to-br from-black  opacity-30 via-transparent to-transparent rounded-md" /> */}
                    </>
                  )}
                </div>
                <div className="px-2 py-1  flex flex-col gap-2">
                  <h1 className="flex items-center text-[14px] flex-nowrap md:text-[16px] gap-2 ">
                    <FaRegBuilding className="fill-orange-500" />
                    <p className="font-medium text-[13px] lg:text-[15px] truncate text-black">
                      {data.name}
                    </p>
                  </h1>
                  <div className="flex items-center   gap-2 text-xs">
                    <span>
                      <FaLocationArrow className="fill-green-400" />
                    </span>
                    <p className="flex truncate  text-xs text-neutral-800">
                      {data?.address}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <h1 className=" px-5 text-lg font-bold text-orange-400">Rent:</h1>
        <div className=" flex overflow-x-auto w-full  py-10 px-5 md:px-10 gap-8">
          {rentCategoryListing &&
            rentCategoryListing.map((data, index) => (
              <Link
                to={`listing/${data._id}`}
                key={index}
                className="border w-[150px] hover:bg-gradient-to-tr hover:border-black/20 from-slate-400/40 hover:scale-105 duration-300 transition-all md:w-[300px] flex flex-col md:gap-4 gap-2  rounded-lg h-auto"
                // className="border w-[150px] md:w-[300px] flex flex-col md:gap-4 gap-2  rounded-lg h-auto"
              >
                <div className="md:w-[300px] md:h-[200px] w-[150px] h-[100px]">
                  {data.images && (
                    <>
                      <img
                        src={data.images[0]}
                        className="object-cover w-full rounded-tl-lg rounded-tr-lg  h-full"
                      />
                      {/* <div className=" inset-0 bg-gradient-to-tr from-black  opacity-10 via-transparent to-transparent rounded-md" />
                      <div className=" inset-0 bg-gradient-to-br from-black  opacity-90 via-transparent to-transparent rounded-md" />
                      <div className=" inset-0 bg-gradient-to-tl from-black  opacity-60 via-transparent to-transparent rounded-md" />
                      <div className=" inset-0 bg-gradient-to-br from-black  opacity-30 via-transparent to-transparent rounded-md" /> */}
                    </>
                  )}
                </div>

                <div className="px-2 py-1  flex flex-col gap-2">
                  <h1 className="flex items-center text-[14px] flex-nowrap md:text-[16px] gap-2 ">
                    <FaRegBuilding className="fill-orange-500" />
                    <p className="font-medium text-[13px] lg:text-[15px] truncate text-black">
                      {data.name}
                    </p>
                  </h1>
                  <div className="flex items-center   gap-2 text-xs">
                    <span>
                      <FaLocationArrow className="fill-green-400" />
                    </span>
                    <p className="flex truncate  text-xs text-neutral-800">
                      {data?.address}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        {/* <div className=" flex overflow-x-auto max-w-screen  gap-8">
          {sellCategoryListing &&
            sellCategoryListing.map((data, index) => (
              <div
                key={index}
                className="border flex flex-col gap-4 w-[500px] h-auto"
              >
                <div className="">
                  {data.images && (
                    <img
                      src={data.images[0]}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div>
                  <h1 className="truncate">{data.name}</h1>
                </div>
              </div>
            ))}
        </div>
        <div className=" flex overflow-x-auto max-w-screen  gap-8">
          {rentCategoryListing &&
            rentCategoryListing.map((data, index) => (
              <div
                key={index}
                className="border flex flex-col gap-4 w-[500px] h-auto"
              >
                <div className="">
                  {data.images && (
                    <img
                      src={data.images[0]}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div>
                  <h1 className="truncate">{data.name}</h1>
                </div>
              </div>
            ))}
        </div> */}
      </section>
    </div>
  );
};

export default HomeCategoryListing;
