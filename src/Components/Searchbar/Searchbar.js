import { Component } from "react";
import { toast } from "react-toastify";

import { FcSearch } from "react-icons/fc";

import {
  Header,
  SearchForm,
  SearcFormButton,
  SercFormButtonLabel,
  SearcFormInput,
} from "./Searchbar.styled";

export default class Searchbar extends Component {
  state = {
    searchWord: "",
  };

  handleWordChange = (event) => {
    console.log(
      " handleWordChange",
      this.setState({ searchWord: event.currentTarget.value.toLowerCase() })
    );
    // console.log(event)
    // console.log('event.currentTarget', event.currentTarget)
    // console.log(
    //   'event.currentTarget.value',
    //   event.currentTarget.value.toLowerCase(),
    // )
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.searchWord.trim() === "") {
      toast.warning("Введите запрос!");
      return;
    }

    this.props.onSubmit(this.state.searchWord);
    this.setState({ searchWord: "" });
  };
  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearcFormInput
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            name="searchWord"
            value={this.state.searchWord}
            onChange={this.handleWordChange}
          />

          <SearcFormButton type="button" onClick={this.handleSubmit}>
            <SercFormButtonLabel>Search</SercFormButtonLabel>
            <FcSearch />
          </SearcFormButton>
        </SearchForm>
      </Header>
    );
  }
}
