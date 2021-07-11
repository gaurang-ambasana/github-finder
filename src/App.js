import React, { Component, Fragment } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  searchUsers = (text) => {
    this.setState({ loading: true, alert: null });
    axios
      .get(
        `https://api.github.com/search/users?q=${text}
        &client_id=${process.env.MY_GITHUB_CLIENT_ID}
        &client_secret=${process.env.MY_GITHUB_CLIENT_SECRET}`
      )
      .then((response) => {
        this.setState({ users: response.data.items, loading: false });
      });
  };

  clearUsers = () => this.setState({ users: [], loading: false, alert: null });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { users, loading, alert } = this.state;

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
                      onSearch={this.searchUsers}
                      onClear={this.clearUsers}
                      displayClearButton={Boolean(users.length)}
                      onAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
