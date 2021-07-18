import React, { useState, Fragment } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  const searchUsers = (text) => {
    setLoading(true);
    setAlert(null);

    axios
      .get(
        `https://api.github.com/search/users?q=${text}
        &client_id=${process.env.MY_GITHUB_CLIENT_ID}
        &client_secret=${process.env.MY_GITHUB_CLIENT_SECRET}`
      )
      .then((response) => {
        setUsers(response.data.items);
        setLoading(false);
      });
  };

  const getUser = (username) => {
    setLoading(true);
    setAlert(null);

    axios
      .get(
        `https://api.github.com/users/${username}?client_id=
        ${process.env.MY_GITHUB_CLIENT_ID}&client_secret=${process.env.MY_GITHUB_CLIENT_SECRET}`
      )
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      });
  };

  const getUserRepos = (username) => {
    setLoading(true);
    setAlert(null);

    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
         client_id=${process.env.MY_GITHUB_CLIENT_ID}&client_secret=${process.env.MY_GITHUB_CLIENT_SECRET}`
      )
      .then((response) => {
        setRepos(response.data);
        setLoading(false);
      });
  };

  const clearUsers = () => {
    setUsers([]);
    setAlert(null);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    onSearch={searchUsers}
                    onClear={clearUsers}
                    displayClearButton={Boolean(users.length)}
                    onAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/users/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
