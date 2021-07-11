import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  searchUsers = (text) => {
    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.MY_GITHUB_CLIENT_ID}&client_secret=${process.env.MY_GITHUB_CLIENT_SECRET}`
      )
      .then((response) => {
        this.setState({ users: response.data.items, loading: false });
      });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search onSearch={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
