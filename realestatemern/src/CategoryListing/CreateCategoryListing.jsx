import React, { useState } from "react";
import { storage } from "../Firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  BathIcon,
  BedDouble,
  ChevronLeft,
  ParkingCircle,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const CreateCategoryListing = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [rent, setRent] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [offer, setOffer] = useState(false);
  const [sell, setSell] = useState(false);
  const [parking, setParking] = useState(false);
  const [bedRooms, setBedRooms] = useState(0);
  const [bathRooms, setBathRooms] = useState(0);
  const [regularPrice, setRegularPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please Select Image");
      return;
    }
    try {
      const imageref = ref(storage, `image/${v4()}`);
      await uploadBytes(imageref, image);
      const images = await getDownloadURL(imageref);
      console.log(images);
      setImages((prev) => [...prev, images]);
      // setImages(null);
    } catch (error) {
      console.log(error);
    }
  };
  const selectImage = (e) => {
    setImage(e.target.files[0]);
  };
  const deleteImage = (id) => {
    const newImage = images.filter((url) => url !== id);
    setImages(newImage);
  };
  const createCategoryListing = async (e) => {
    try {
      e.preventDefault();
      if (name.trim() == "") {
        toast.error("Please fill name");
        return;
      }
      if (description.trim() == "") {
        toast.error("Please provide some description");
        return;
      }
      if (address.trim() == "") {
        toast.error("Please provide address");
        return;
      }
      let regularPriceNum = parseFloat(regularPrice);
      // let discountPriceNum = parseFloat(discountPrice);
      if (isNaN(regularPriceNum) || regularPriceNum <= 0) {
        toast.error("Price should be greater than zero");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/data/createCategoryListing",
        {
          furnished,
          offer,
          rent,
          parking,
          images,
          regularPrice,
          discountPrice,
          name,
          sell,
          address,
          description,
          bedRooms,

          bathRooms,
          userRef: {
            id: user._id,
            email: user.email,
          },
        }
      );
      console.log(response);
      console.log(response.data.message);
      setTimeout(() => {
        toast.success("Created");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      {/* //  <h1>user:{user.email}{user._id}</h1> */}
      <section className="fixed flex items-center w-full py-3 border-b z-10 p-2 bg-white">
        <button
          onClick={back}
          className="border rounded-lg p-2 flex items-center"
        >
          <ChevronLeft />
          Back
        </button>
        <h1 className="text-center font-bold text-lg text-orange-400 flex items-center  mx-auto">
          CreateCategorListing
        </h1>
      </section>
      <section className="py-20 px-3 lg:px-10 ">
        <div className="border lg:border-2 border-neutral-400 rounded-lg">
          <form
            onSubmit={(e) => createCategoryListing(e)}
            className="px-3  flex flex-col gap-2"
          >
            <div className="flex flex-col py-2  gap-2">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 outline-none rounded-lg"
              />
            </div>

            <div className="flex py-2 flex-col gap-2">
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 outline-none rounded-lg"
              />
            </div>
            <div className="flex py-2 flex-col gap-2">
              <label>Address</label>
              <textarea
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 rounded-lg outline-none"
              />
            </div>
            <section className="flex  flex-col border p-2  w-full rounded-lg  shadow-lg shadow-black/10 flex-wrap">
              <div className="flex items-center flex-wrap gap-4 md:gap-8">
                {" "}
                <div className=" flex gap-1 flex-col">
                  <span>RegularPrice</span>
                  <input
                    className="border rounded-md outline-none p-2"
                    type="number"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                  />
                </div>
                <div className="flex gap-1 flex-col">
                  <span>DiscountPrice</span>
                  <input
                    className="border rounded-md outline-none p-2"
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                  />
                </div>
                <div className="flex gap-1 flex-col">
                  <span className="flex gap-1 items-center">
                    <BedDouble className="text-orange-400" size={15} />
                    BedRooms
                  </span>

                  <input
                    className="border outline-none rounded-md p-2"
                    type="number"
                    value={bedRooms}
                    onChange={(e) => setBedRooms(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1">
                    <BathIcon className="text-orange-400" size={15} />
                    BathRooms
                  </span>
                  <input
                    className="border rounded-md outline-none p-2"
                    type="number"
                    value={bathRooms}
                    onChange={(e) => setBathRooms(e.target.value)}
                  />
                </div>
              </div>

              <hr className="m-2  mt-5 border border-orange-400/40" />
              <section className="flex text-xl  flex-wrap   justify-between p-2 gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={furnished}
                    onChange={(e) => setFurnished(e.target.checked)}
                  />
                  <label className="flex  text-[14px] items-center">
                    <Shield size={15} className="text-orange-400" />
                    Furnished
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={offer}
                    onChange={(e) => setOffer(e.target.checked)}
                  />
                  <label className=" text-[14px] ">Offer</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={parking}
                    onChange={(e) => setParking(e.target.checked)}
                  />
                  <label className="flex  text-[14px] items-center">
                    <ParkingCircle size={15} className="text-orange-400" />
                    Parking
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sell}
                    onChange={(e) => setSell(e.target.checked)}
                  />
                  <label className=" text-[14px]">Sell</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rent}
                    onChange={(e) => setRent(e.target.checked)}
                  />
                  <label className="text-[13px]">Rent</label>
                </div>
              </section>
            </section>

            <section className="py-5">
              <input
                type="file"
                className=" "
                onChange={(e) => selectImage(e)}
              />
              <button
                type="button"
                className="border p-2 rounded-lg"
                onClick={(e) => handleImageUpload(e)}
              >
                Upload
              </button>
              <div>
                {images &&
                  images.map((data, index) => (
                    <div key={index}>
                      <img className="w-[50px] h-[40px]" src={data} />
                      <button type="button" onClick={(e) => deleteImage(data)}>
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </section>
            <section className="py-3">
              <button
                type="submit"
                className="p-3 border text-lg rounded-lg shadow-sm hover:bg-green-400 hover:text-white hover:scale-100 hover:translate-x-2 font-semibold"
              >
                CreateCategoryLisiting
              </button>
            </section>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateCategoryListing;
