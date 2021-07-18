import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USER,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SET_ALERT,
} from "../types";

const GithubState = (props) => {
  const intialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, intialState);

  const searchUsers = (text) => {
    setLoading();

    axios
      .get(
        `https://api.github.com/search/users?q=${text}
        &client_id=${process.env.MY_GITHUB_CLIENT_ID}
        &client_secret=${process.env.MY_GITHUB_CLIENT_SECRET}`
      )
      .then((response) => {
        dispatch({
          type: SEARCH_USER,
          payload: response.data.items,
        });
      });
  };

  const getUser = (username) => {
    setLoading();

    axios
      .get(
        `https://api.github.com/users/${username}?client_id=
        ${process.env.MY_GITHUB_CLIENT_ID}&client_secret=${process.env.MY_GITHUB_CLIENT_SECRET}`
      )
      .then((response) => {
        dispatch({
          type: GET_USER,
          payload: response.data,
        });
      });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
