import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSearch(this.state.text);
            this.setState({ text: "" });
          }}
          className="form"
        >
          <input
            type="text"
            name="text"
            value={this.state.text}
            placeholder="Search here...."
            autoComplete="off"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
      </div>
    );
  }
}

export default Search;
