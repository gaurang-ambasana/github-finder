import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import GithubContext from "../context/github/githubContext";

const Search = ({ onAlert }) => {
  const githubContext = useContext(GithubContext);

  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (text === "") {
      onAlert("Search text cannot be empty", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  const changeHandler = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <input
          type="text"
          name="text"
          value={text}
          placeholder="Search here...."
          autoComplete="off"
          onChange={changeHandler}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {Boolean(githubContext.users.length) && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default Search;
