import React, { useContext, useState } from "react";
import GithubContext from "../context/github/githubContext";
import AlertContext from "../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (text === "") {
      alertContext.setAlert("Search text cannot be empty", "light");
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

export default Search;
