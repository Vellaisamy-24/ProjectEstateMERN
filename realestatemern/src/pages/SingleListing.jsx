import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { Mail } from "lucide-react";
import { X } from "lucide-react";
import { Check } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SingleListing = () => {
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    fetchListingById();
  }, [id]);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [regularPrice, setRegularPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [bathRooms, setBathRooms] = useState(0);
  const [bedRooms, setBedRooms] = useState(0);
  const [images, setImages] = useState([]);
  const [furnished, setFurnished] = useState(false);
  const [offer, setOffer] = useState(false);
  const [rent, setRent] = useState(false);
  const [parking, setParking] = useState(false);
  const [sell, setSell] = useState(false);
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const fetchListingById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/data/getSingleCategoryListingById/${id}`
      );
      console.log(response);
      console.log(response.data?.message);
      setParking(response.data?.categoryListingById?.parking);
      setDescription(response.data?.categoryListingById?.description);
      setRent(response.data?.categoryListingById?.rent);
      setAddress(response.data?.categoryListingById?.address);
      setOffer(response.data?.categoryListingById?.offer);
      setSell(response.data?.categoryListingById?.sell);
      setOffer(response.data?.categoryListingById?.offer);
      setUser(response.data?.categoryListingById?.userRef);
      setRegularPrice(response.data?.categoryListingById?.regularPrice);
      setDiscountPrice(response.data?.categoryListingById?.discountPrice);
      setBathRooms(response.data?.categoryListingById?.bathRooms);
      setBedRooms(response.data?.categoryListingById?.bedRooms);
      setImages(response?.data?.categoryListingById?.images);
      setName(response?.data?.categoryListingById?.name);
    } catch (error) {
      console.log(error);
    }
  };
  const back = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="fixed border-b py-3 px-3 top-0 w-full bg-white z-10">
        <button
          className="flex items-center gap-2 border p-2 rounded-lg shadow-sm"
          onClick={back}
        >
          <ChevronLeft />
          back
        </button>
      </div>
      <section className="sm:px-10 px-2 py-28">
        {/* {id} */}

        <div className="py-3 border rounded-lg">
          <div className="flex px-2 border-b  py-2 gap-2">
            {/* sm:w-[200px] sm:h-[150px] h-[100px] w-[130px] */}
            <div className="w-1/2 sm:w-1/4 lg:w-1/6">
              <img
                src={images[0]}
                className="rounded-lg w-full h-full oject-cover"
              />
            </div>

            <div className="flex w-full sm:w-2/4 lg:w-1/2  flex-col sm:gap-4 lg:gap-6 gap-2">
              <h1 className="flex  text-[14px] flex-wrap font-semibold">
                {name}
              </h1>
              <p className="flex text-xs flex-wrap text-slate-600">
                {description}
              </p>
              <div className="flex gap-3 sm:gap-4 md:gap-8">
                <div className="flex items-center flex-col">
                  <BedDouble />
                  <p className="text-[9px] sm:text-xs text-neutral-400">
                    {bedRooms}Bed
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <BathIcon />
                  <p className="text-[9px] sm:text-xs text-neutral-400">
                    {bathRooms}Bath
                  </p>
                </div>
                {/* {JSON.stringify(parking)} */}
                {parking ? (
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
                {furnished ? (
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
          <div className="flex py-3 flex-col px-2 gap-3">
            <span className="flex items-center gap-2">
              <CiLocationOn className="fill-orange-500 " />
              <p className="text-xs flex flex-wrap">{address}</p>
            </span>
            <div className="flex gap-2">
              <div>
                {sell ? (
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
                {offer ? (
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
                {rent ? (
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
                {regularPrice}
              </p>
            </span>
            <span className="flex text-[15px] items-center gap-1">
              Discount:
              <p className="flex items-center text-xs text-neutral-500">
                <IndianRupee size={12} />
                {discountPrice}
              </p>
            </span>
            {/* <span>Discount:{discountPrice}</span> */}
            <a
              className="cursor-pointer hover:shadow-sm"
              href={`mailto:${user?.email}`}
            >
              <h1 className="font-semibold text-orange-400">Contact</h1>
              <p className="flex items-center py-1 gap-1 text-black text-[15px] font-medium">
                <Mail size={15} /> Email:
                <p className=" text-neutral-400 text-xs">
                  {user && user.email}
                </p>
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleListing;
