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
import GithubState from "./components/context/github/GithubState";

const App = () => {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

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

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
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
                    <Search onAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/users/:login"
                render={(props) => (
                  <User {...props} getRepos={getUserRepos} repos={repos} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
