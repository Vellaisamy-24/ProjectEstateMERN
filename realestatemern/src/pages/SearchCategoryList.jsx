import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchCategoryList = () => {
  const [searchCategoryList, setSearchCategoryList] = useState([]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("searchTerm");

    const URLSale = urlParams.get("sale");
    const URLRent = urlParams.get("rent");
    const URLFurnished = urlParams.get("furnished");
    const URLParking = urlParams.get("parking");
    const URLOffer = urlParams.get("offer");
    console.log(search);
    setSearch(search || "");
    setRent(URLRent === "true" ? true : false);
    setSale(URLSale === "true" ? true : false);
    setFurnished(URLFurnished === "true" ? true : false);
    setOffer(URLOffer === "true" ? true : false);
    setParking(URLParking === "true" ? true : false);
    const fetchSearchData = async () => {
      try {
        const URLParams = new URLSearchParams(window.location.search);
        const searchQuery = URLParams.toString();
        console.log(searchQuery);
        const response = await axios.get(
          `http://localhost:5000/api/data/getCategoryListing?${searchQuery}`
        );

        console.log(response);
        console.log(response.data.message);
        console.log(response.data?.categoryListing);
        setSearchCategoryList(response.data?.categoryListing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchData();
  }, [window.location.search]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sale, setSale] = useState(false);
  const [rent, setRent] = useState(false);
  const [offer, setOffer] = useState(false);
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const handleFilter = (e) => {
    try {
      e.preventDefault();
      const urlParams = new URLSearchParams();

      urlParams.set("searchTerm", search);
      urlParams.set("offer", offer);
      urlParams.set("rent", rent);
      urlParams.set("furnished", furnished);
      urlParams.set("parking", parking);
      urlParams.set("sale", sale);

      const searchQuery = urlParams.toString();
      console.log(searchQuery);
      navigate(`/search?${searchQuery}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleFilter(e)}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="p-3 rounded-lg border-2 border-slate-400 shadow-lg"
        />

        <div className="flex gap-8 ">
          <div>
            <label>
              {/* {JSON.stringify(rent)} */}
              <input
                type="checkbox"
                checked={rent}
                onChange={(e) => setRent(e.target.checked)}
              />
              Rent
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={sale}
                onChange={(e) => setSale(e.target.checked)}
              />
              Sale
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
              />
              Furnished
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />
              Parking
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={offer}
                onChange={(e) => setOffer(e.target.checked)}
              />
              Offer
            </label>
          </div>
          <button
            type="submit"
            className="border p-3 rounded-lg bg-neutral-400 text-white font-bold shadow-lg transition-all hover:scale-x-105"
          >
            Apply
          </button>
        </div>
      </form>
      <div>
        {searchCategoryList &&
          searchCategoryList.map((data, index) => (
            <div key={index}>
              <div className="w-10 h-auto">
                {data.images && <img src={data.images[0]} />}
              </div>
              {data.name}
              {data.description}
              {data.address}
              {data.regularPrice}
              {data.discountPrice}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchCategoryList;
