import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchCategoryList from "./SearchCategoryList";
import axios from "axios";
const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("searchTerm", search);
      const searchQuery = urlParams.toString();
      // const response = await axios.get(
      //   "http://localhost:5000/api/data/getCategoryListing/",
      //   {
      //     searchTerm: search,
      //   }
      // );
      // console.log(response.data?.message);
      // console.log(response.data?.categoryListing);
      navigate(`/search?${searchQuery}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // {user.email}{user._id}
    <div className="flex  border p-10 justify-between items-center">
      <div className="font-bold">
        <h1 className="text-3xl">
          Vellai<span className="text-orange-400">Estate</span>
        </h1>
      </div>
      <div>
        <form onSubmit={(e) => handleSearch(e)}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="p-3 rounded-lg border-2 border-slate-400 shadow-lg"
          />
        </form>

        {/* <SearchCategoryList /> */}
      </div>
      <div className="flex gap-8 px-10  text-sm flex-wrap">
        <Link to={"/"}>Home</Link>
        <Link to={"/sign-in"}>Sign-in</Link>
        <Link to={"/sign-up"}>Sign-up</Link>
        {user?.email && (
          <>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/userCategoryListing"}>Your Listing</Link>
            <Link to={"/createCategoryListing"}>Create Listing</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
