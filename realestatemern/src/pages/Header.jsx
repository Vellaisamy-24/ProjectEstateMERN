import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchCategoryList from "./SearchCategoryList";
const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    // {user.email}{user._id}
    <div className="flex  border p-10 justify-between items-center">
      <div className="font-bold">
        <h1 className="text-3xl">
          Vellai<span className="text-orange-400">Estate</span>
        </h1>
      </div>
      <div>
        <SearchCategoryList />
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
