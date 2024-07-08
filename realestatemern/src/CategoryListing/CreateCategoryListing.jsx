import React, { useState } from "react";
import { storage } from "../Firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
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
  const user = useSelector((state) => state.user.currentUser);
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
  const selectImage = (e) => {
    setImage(e.target.files[0]);
  };
  const deleteImage = (id) => {
    const newImage = images.filter((url) => url !== id);
    setImage(newImage);
  };
  const createCategoryListing = async (e) => {
    try {
      e.preventDefault();
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
      <h1>CreateCategorListing</h1>
      <form
        onSubmit={(e) => createCategoryListing(e)}
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
            <label>Rent</label>
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
            CreateCategoryLisiting
          </button>
        </section>
      </form>
    </div>
  );
};

export default CreateCategoryListing;
