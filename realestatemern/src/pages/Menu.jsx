import React from "react";
import { FilePlus } from "lucide-react";
import { ListCollapse } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <section className="flex flex-col w-full">
      <header className="flex items-center fixed top-0 z-10 bg-white py-7 w-full border">
        <Link
          to="/"
          className="flex hover:border-orange-400 items-center gap-1 border rounded-lg  mx-5 p-2"
        >
          <ChevronLeft />
          Back
        </Link>
      </header>
      <div className="py-40 flex flex-col md:items-center md:justify-center md:w-full">
        <h1 className=" font-semibold text-center md:text-lg ">Menu</h1>
        <Link
          to="/createCategoryListing"
          className="flex m-5  md:text-lg  rounded-lg gap-8 max-w-lg md:max-w-2xl border  shadow-md px-20 p-5"
        >
          <span>
            <FilePlus />
          </span>
          <h1>Create Listing</h1>
        </Link>
        <Link
          to="/userCategoryListing"
          className="flex mx-5 md:text-lg   rounded-lg gap-8 shadow-md  max-w-lg md:max-w-2xl px-20 border  p-5"
        >
          <span>
            <ListCollapse />
          </span>
          <h1>Your Listing</h1>
        </Link>
      </div>
    </section>
  );
};

export default Menu;
