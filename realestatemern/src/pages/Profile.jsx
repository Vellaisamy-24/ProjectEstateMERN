import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SignOut from "./Sign-out";
import DeleteAccount from "./DeleteAccount";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    handleProfile();
  }, [user]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState("");
  const handleProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/getUser/${user._id}`
      );
      console.log(response.data);
      console.log(response.data.message);
      console.log(response.data.user);
      setUserName(response.data?.user?.userName || "");
      setEmail(response.data?.user?.email || "");
      setProfile(response.data?.user?.profile || "");
      setCity(response.data?.user?.city || "");
      setCountry(response.data?.user?.country || "");
      setPhone(response.data?.user?.phone || "");
      setPostalCode(response.data?.user?.postalCode || "");
      setState(response.data?.user?.state || "");
      setAddress(response.data?.user?.address || "");
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/updateUser/${user._id}`,
        {
          userName,
          phone,
          address,
          city,
          country,
          postalCode,
          state,
          profile,
        }
      );
      console.log(response.data.message);
      handleProfile();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* {user._id}{user.email} */}
      <form
        onSubmit={(e) => handleProfileUpdate(e)}
        className="border flex flex-col gap-4 p-5"
      >
        <h1 className="font-bold text-center text-2xl text-orange-400 ">
          Profile
        </h1>
        <div className="flex items-center justify-center">
          <label className="hover:cursor-pointer">
            <input className="hidden" type="file" />
            <img src={profile} className="w-[60px] rounded-full" />
          </label>
        </div>
        <div className="flex flex-col p-3 gap-4">
          <div className="flex items-center gap-4">
            <label>Email</label>
            <input
              value={email}
              disabled={true}
              className="p-3 border truncate rounded-lg"
              type="email"
            />
          </div>
          <div className="flex items-center gap-4">
            <label>UserName</label>
            <input
              className="border rounded-lg text-slate-600 p-3"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label>Phone</label>
            <input
              className="border p-3"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label>Address</label>
            <input
              className="border p-3 truncate"
              type="tel"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label>PostalCode</label>
            <input
              className="border p-3"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label>City</label>
            <input
              className="border p-3"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label>State</label>
            <input
              className="border p-3"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label>Country</label>
            <input
              className="border p-3"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="text-white hover:opacity-50 bg-orange-400 p-3 border  rounded-lg"
          >
            Update
          </button>
        </div>
      </form>
      <div className="flex justify-between gap-8 p-10 ">
        <span className="bg-green-400 hover:opacity-70 text-white p-3 rounded-lg font-medium">
          <SignOut />
        </span>
        <span className="bg-red-400 hover:opacity-70 text-white p-3 rounded-lg font-medium">
          <DeleteAccount />
        </span>
      </div>
    </div>
  );
};

export default Profile;
