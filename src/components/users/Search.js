import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ onSearch, onClear, displayClearButton, onAlert }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (text === "") {
            onAlert("Search text cannot be empty", "light");
          } else {
            onSearch(text);
            setText("");
          }
        }}
        className="form"
      >
        <input
          type="text"
          name="text"
          value={text}
          placeholder="Search here...."
          autoComplete="off"
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {displayClearButton && (
        <button className="btn btn-light btn-block" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  displayClearButton: PropTypes.bool.isRequired,
};

export default Search;
