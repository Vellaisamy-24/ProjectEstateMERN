import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchCategoryList from "./SearchCategoryList";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { SquareUserRound } from "lucide-react";
import { Menu } from "lucide-react";
import { Heart } from "lucide-react";
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
    <section className="flex fixed z-10 bg-white w-full  border py-7 justify-between items-center">
      <div className="font-bold">
        <h1 className="text-3xl">
          Vellai<span className="text-orange-400">Estate</span>
        </h1>
      </div>
      <div>
        <form onSubmit={(e) => handleSearch(e)}>
          <label className="flex items-center border border-neutral-400 rounded-md  shadow-md p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="outline-none"
            />
            <CiSearch className=" w-8 h-4" />
          </label>
        </form>

        {/* <SearchCategoryList /> */}
      </div>
      <div className="hidden md:flex  text-[15px] gap-8 px-10 font-semibold flex-wrap">
        <Link className="hover:underline hover:text-blue-500 " to={"/"}>
          Home
        </Link>
        {!user?.email && (
          <>
            {" "}
            <Link
              className="hover:underline hover:text-blue-500 "
              to={"/sign-in"}
            >
              Sign-in
            </Link>
            <Link
              className="hover:underline hover:text-blue-500 "
              to={"/sign-up"}
            >
              Sign-up
            </Link>
          </>
        )}

        {user?.email && (
          <>
            <Link
              className="hover:underline hover:text-blue-500 "
              to={"/profile"}
            >
              Profile
            </Link>
            <Link
              className="hover:underline hover:text-blue-500 "
              to={"/userCategoryListing"}
            >
              Your Listing
            </Link>
            <Link
              className="hover:underline hover:text-blue-500 "
              to={"/createCategoryListing"}
            >
              Create Listing
            </Link>
          </>
        )}
      </div>
      <div className="fixed md:hidden flex justify-between items-center w-full bottom-0 z-10 bg-white border py-5">
        <span className="px-5">
          <IoHomeOutline className="w-6 h-6" />
        </span>
        <span>
          <Heart className="w-6 h-6" />
        </span>
        <span>
          <SquareUserRound className="w-6 h-6" />
        </span>
        <Link to="/menu" className="px-5">
          <Menu className="w-6 h-6" />
        </Link>
      </div>
    </section>
  );
};

export default Header;
