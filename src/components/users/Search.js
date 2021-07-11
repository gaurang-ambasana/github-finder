import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    displayClearButton: PropTypes.bool.isRequired,
  };

  render() {
    const { onSearch, onClear, displayClearButton } = this.props;
    const { text } = this.state;

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (this.state.text === "") {
              this.props.onAlert("Search text cannot be empty", "light");
            } else {
              onSearch(text);
              this.setState({ text: "" });
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
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
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
  }
}

export default Search;
