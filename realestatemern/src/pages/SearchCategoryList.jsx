import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
const SearchCategoryList = () => {
  const [searchCategoryList, setSearchCategoryList] = useState([]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromURL = urlParams.get("searchTerm");
    const searchQuery = searchTermFromURL.toString();
    console.log(searchTermFromURL);
    setSearch(searchTermFromURL || "");
    const fetchSearchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/data/getCategoryListing?searchTerm=${searchQuery}`
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
const navigate=useNavigate()
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
      const searchQuery=urlParams.toString()
      navigate(`/search?${searchQuery}`)

      
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchCategoryList;
