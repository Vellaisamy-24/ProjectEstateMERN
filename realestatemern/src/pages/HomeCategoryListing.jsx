import axios from "axios";
import React, { useEffect, useState } from "react";

const HomeCategoryListing = () => {
  useEffect(() => {
    fetchOfferCategoryListing();
  }, []);
  const [offerCategoryListing, setOfferCategoryListing] = useState([]);
  const [sellCategoryListing, setSellCategoryListing] = useState([]);
  const [rentCategoryListing, setRentCategoryListing] = useState([]);
  const fetchOfferCategoryListing = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/data/getCategoryListing?offer=true"
      );
      console.log(response);
      setOfferCategoryListing(response.data?.categoryListing);
      fetchRentCategoryListing();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRentCategoryListing = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/data/getCategoryListing?rent=true"
      );
      console.log(response);
      setRentCategoryListing(response.data?.categoryListing);
      fetchSaleCategoryListing();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSaleCategoryListing = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/data/getCategoryListing?sale=true"
      );
      console.log(response);
      setSellCategoryListing(response.data?.categoryListing);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <section>
        <h1>Offers:</h1>
        <div className=" flex overflow-x-auto max-w-screen  gap-8">
          {offerCategoryListing &&
            offerCategoryListing.map((data, index) => (
              <div className="border flex flex-col gap-4 w-[500px] h-auto">
                <div className="">
                  {data.images && (
                    <img
                      src={data.images[0]}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div>
                  <h1 className="truncate">{data.name}</h1>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomeCategoryListing;
