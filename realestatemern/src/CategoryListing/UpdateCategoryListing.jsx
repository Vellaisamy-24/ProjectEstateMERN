import React, { useEffect, useState } from "react";
import { storage } from "../Firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  BathIcon,
  BedDouble,
  ChevronLeft,
  ParkingCircle,
  Shield,
} from "lucide-react";
const CreateCategoryListing = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
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
  // const navigate = useNavigate();
  const params = useParams();
  // const user = useSelector((state) => state.user.currentUser);
  const id = params.id;
  useEffect(() => {
    fetchCategoryListingById();
  }, [id]);
  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      const imageref = ref(storage, `image/${v4()}`);
      await uploadBytes(imageref, image);
      const images = await getDownloadURL(imageref);
      console.log(images);
      setImages((prev) => [...prev, images]);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const selectImage = (e) => {
    setImage(e.target.files[0]);
  };
  const deleteImage = (id) => {
    console.log(id);
    const newImage = images.filter((url) => url !== id);
    setImages(newImage);
  };
  const back = () => {
    navigate(-1);
  };

  const fetchCategoryListingById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/data/getSingleCategoryListingById/${id}`
      );
      console.log(response);
      console.log(response.data?.message);
      setName(response.data?.categoryListingById?.name);
      setDescription(response.data?.categoryListingById?.description);
      setAddress(response.data?.categoryListingById?.address);
      setRegularPrice(response.data?.categoryListingById?.regularPrice);
      setDiscountPrice(response.data?.categoryListingById?.discountPrice);
      setBedRooms(response.data?.categoryListingById?.bedRooms);
      setBathRooms(response.data?.categoryListingById?.bathRooms);
      setFurnished(response.data?.categoryListingById?.furnished);
      setOffer(response.data?.categoryListingById?.offer);
      setParking(response.data?.categoryListingById?.parking);
      setSell(response.data?.categoryListingById?.sell);
      setImages(response.data?.categoryListingById?.images);
    } catch (error) {
      console.log(error);
    }
  };
  const updateCategoryListingById = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `http://localhost:5000/api/data/updateCategoryListingById/${id}`,
        {
          name,
          description,
          offer,
          rent,
          sell,
          parking,
          furnished,
          regularPrice,
          discountPrice,
          address,
          bedRooms,
          bathRooms,
          images,
        }
      );
      console.log(response);
      console.log(response.data?.message);
      fetchCategoryListingById();
      setTimeout(() => {
        toast.success("Updated");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      {/* //  <h1>user:{user.email}{user._id}</h1> */}
      {/* <h1>UpdateCategoryListing:{params.id}</h1> */}
      <section className="w-full bg-white fixed z-10 py-3 p-2 border-b flex items-center">
        <button
          onClick={back}
          className="flex items-center border p-2 rounded-lg gap-1"
        >
          <ChevronLeft />
          Back
        </button>
        <h1 className="flex items-center mx-auto gap-1">
          Update <p className="text-orange-400 text-lg font-bold">{name}</p>
        </h1>
      </section>
      <section className="py-20 px-3 lg:px-10 ">
        <div className="border lg:border-2 border-neutral-400 rounded-lg">
          <form
            onSubmit={(e) => updateCategoryListingById(e)}
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
                className="p-2 border  rounded-lg shadow-sm hover:bg-green-400 hover:text-white hover:scale-100  font-semibold"
              >
                Update
              </button>
            </section>
          </form>
        </div>
      </section>
      {/* <section className="py-20">
        <form
          onSubmit={(e) => updateCategoryListingById(e)}
          className="p-10 flex flex-col gap-4"
        >
          <div className="flex py-3 items-center gap-4">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3"
            />
          </div>

          <div className="flex py-3 items-center gap-4">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-3"
            />
          </div>
          <div className="flex py-3 items-center gap-4">
            <label>Address</label>
            <textarea
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-3"
            />
          </div>
          <section className="flex  border p-5 gap-4 md:gap-8 rounded-lg shadow-lg shadow-violet-400 flex-wrap">
            <div className="">
              <span>RegularPrice</span>
              <input
                className="border p-2"
                type="number"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
              />
            </div>
            <div>
              <span>DiscountPrice</span>
              <input
                className="border p-2"
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>
            <div>
              <span>BedRooms</span>
              <input
                className="border p-2"
                type="number"
                value={bedRooms}
                onChange={(e) => setBedRooms(e.target.value)}
              />
            </div>
            <div>
              <span>BathRooms</span>
              <input
                className="border p-2"
                type="number"
                value={bathRooms}
                onChange={(e) => setBathRooms(e.target.value)}
              />
            </div>
          </section>
          <section className="flex text-xl  flex-wrap p-5 rounded-lg border shadow-pink-500 shadow-sm gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <label>Furnished</label>
              <input
                type="checkbox"
                checked={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
              />
            </div>

            <div className="flex items-center gap-2">
              <label>Offer</label>
              <input
                type="checkbox"
                checked={offer}
                onChange={(e) => setOffer(e.target.checked)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Parking</label>
              <input
                type="checkbox"
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Sell</label>
              <input
                type="checkbox"
                checked={sell}
                onChange={(e) => setSell(e.target.checked)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label>rent</label>
              <input
                type="checkbox"
                checked={rent}
                onChange={(e) => setRent(e.target.checked)}
              />
            </div>
          </section>
          <section>
            <input type="file" onChange={(e) => selectImage(e)} />
            <button type="button" onClick={(e) => handleImageUpload(e)}>
              Upload
            </button>
            <div>
              {images &&
                images.map((data) => (
                  <>
                    <img className="w-[50px] h-[40px]" src={data} />
                    <button type="button" onClick={(e) => deleteImage(data)}>
                      Delete
                    </button>
                  </>
                ))}
            </div>
          </section>
          <section>
            <button
              type="submit"
              className="p-3 border text-lg rounded-lg shadow-sm hover:bg-green-400 hover:text-white hover:scale-100 hover:translate-x-2 font-semibold"
            >
              UpdateCategoryListing
            </button>
          </section>
        </form>
      </section> */}
    </div>
  );
};

export default CreateCategoryListing;
