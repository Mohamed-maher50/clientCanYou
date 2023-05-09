import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function SearchBox({ handleSearchBox }) {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const [searchResults, setSearchResults] = useState([]);
  const config = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  const handleSearchValue = async (e) => {
    const { data } = await axios.get(
      `/search?searchValue=${e.target.value.trim()}`,
      config
    );
    setSearchResults(JSON.parse(data));
  };
  return (
    <>
      <div className="absolute w-fit right-0 top-0 py-4 z-50 px-2 rounded-md shadow bg-open text-gray-400 ">
        <div className="flex items-center">
          <input
            type={"search"}
            className="px-3 w-60 h-10 rounded-full bg-gray-200 outline-none text-black"
            placeholder="Search in You Can"
            spellCheck={false}
            onChange={handleSearchValue}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            onClick={handleSearchBox}
            className="text-2xl icon-btn text-white rounded-full ml-1  font-bold"
          />
        </div>
        <div className="text-center text-white font-bold text-xl">Result</div>
        <div>
          {searchResults.map((box) => {
            return (
              <Link
                onClick={handleSearchBox}
                to={`/profile/${box._id}`}
                key={box._id}
                className="text-open shadow-lg px-3 py-2 bg-darkWhite rounded-lg flex items-center text-xl capitalize mb-3 hover:bg-black hover:border-secondary border-b-4 duration-500 ease-in-out hover:text-darkWhite"
              >
                <div>{box.fullName}</div>
                <div className="w-11 h-11 ml-auto rounded-full overflow-hidden">
                  <img
                    src={box.AvatarUrl}
                    alt={box.fullName}
                    className=" object-cover "
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SearchBox;
