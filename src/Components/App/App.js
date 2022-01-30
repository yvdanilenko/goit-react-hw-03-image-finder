import React from "react";
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";

class App extends Component {
  handleSearchFormSubmit = (searchWord) => {
    // console.log('searchWor APPP', searchWord)
    this.setState({ searchWord: searchWord });
  };

  state = { searchWord: "" };
  render() {
    return (
      <div>
        APPP
        <Searchbar onSubmit={this.handleSearchFormSubmit}></Searchbar>
        <ImageGallery searchWord={this.state.searchWord} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
