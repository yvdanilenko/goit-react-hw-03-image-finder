import { Component } from "react";
import { GalleryList, Container } from "./ImageGallery.styled";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "./../Loader/Loader";
import Button from "./../Button/Button";
import Modal from "./../Modal/Modal";

export default class ImageGallery extends Component {
  state = {
    result: null,
    error: null,
    status: "idle",
    sowModal: false,
    modalImg: null,
    page: 1,
  };

  fetchAPI = (keyWord) => {
    const myKey = "25467433-d0871e395a60e3278e04a539e";
    this.setState({ results: null, error: null, status: "pending" });

    fetch(
      `https://pixabay.com/api/?q=${keyWord}&page=${this.state.page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => {
        return response.json();
      })
      .then((arr) => {
        if (arr.hits.length === 0) {
          return this.setState({
            status: "rejected",
            error: ` ${keyWord} - запрос не найден`,
          });
        }
        return this.setState({ results: arr.hits, status: "resolved" });
      })
      .catch((error) => this.setState({ status: "rejected" }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  getModalPhoto = (url) => {
    this.setState({ modalImg: url });
  };

  loadMorePhotos = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevKeyWord = prevProps.searchWord;
    const keyWord = this.props.searchWord;

    if (prevKeyWord !== keyWord) {
      this.setState({ page: 1 });
      return this.fetchAPI(keyWord);
    }

    if (prevState.page === this.state.page) {
      return;
    } else {
      this.fetchAPI(keyWord);
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { results, error, status, modalImg } = this.state;

    if (status === "idle") {
      return <h2>Enter some word to search!</h2>;
    }

    if (status === "pending") {
      return <Loader></Loader>;
    }

    if (status === "resolved") {
      return (
        <>
          <GalleryList>
            {results.map((result) => (
              <ImageGalleryItem
                key={result.id}
                result={result}
                onClick={this.toggleModal}
                modalPhoto={this.getModalPhoto}
              ></ImageGalleryItem>
            ))}
          </GalleryList>
          <Container>
            <Button onClick={this.loadMorePhotos}></Button>
          </Container>
          {this.state.showModal && (
            <Modal onClick={this.toggleModal} modalImg={modalImg}>
              <button type="button" onClick={this.toggleModal}></button>
            </Modal>
          )}
        </>
      );
    }

    if (status === "rejected") {
      return <h2>{error}</h2>;
    }
  }
}
