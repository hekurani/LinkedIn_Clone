import React, { useRef } from "react";

const ConnectionsHeader = ({
  loading,
  friends,
  searchTerm,
  setSearchTerm = () => {},
}) => {
  const inputRef = useRef(null);
  return (
    <div className="header nr-connections">
      {loading ? (
        <p className="m-5 animate-pulse text-gray-400">Loading...</p>
      ) : friends.length > 0 ? (
        <div>
          <p className="text-xl m-5">{friends.length} Connections</p>
          <div className="searchbar ml-5 mr-3">
            <input
              ref={inputRef}
              type="text"
              className="border border-solid rounded-md p-1 hover:outline"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name"
            />
          </div>
        </div>
      ) : (
        <div className="title">
          <p className="m-5">No Active Connections</p>
          <p className="text-sm m-5">
            {searchTerm
              ? `No connections found for the search term: ${searchTerm}`
              : "Start by connecting with others!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConnectionsHeader;
