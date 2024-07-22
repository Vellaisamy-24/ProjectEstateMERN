import React from "react";
import { Link } from "react-router-dom";
import Header from "../pages/Header";
import HomeCategoryListing from "../pages/HomeCategoryListing";

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className=" py-40">
        <HomeCategoryListing />
      </div>
    </div>
  );
};

export default Home;
