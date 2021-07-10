import React, { Component } from "react";

class UserItem extends Component {
  state = {
    id: "id",
    login: "Gaurang",
    avatar_url: "https://avatars1.githubusercontent.com/u/16131932?v=3&s=460",
    html_url: "https://github.com/Gaurang",
  };

  render() {
    const { login, avatar_url, html_url } = this.state;

    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt="img"
          className="round-img"
          style={{ width: "60px" }}
        />
        <h3>{login}</h3>
        <div>
          <a href={html_url} className="btn btn-dark btn-sm my-1">
            More
          </a>
        </div>
      </div>
    );
  }
}

export default UserItem;
