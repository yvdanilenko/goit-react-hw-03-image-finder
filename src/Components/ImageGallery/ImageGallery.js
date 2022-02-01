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
    showModal: false,
    modalImg: null,
    page: 1,
  };

  fetchAPI = (keyWord, page) => {
    const myKey = "25467433-d0871e395a60e3278e04a539e";
    this.setState({ error: null, status: "pending" });
    const { results } = this.state;

    fetch(
      `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`
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
        return this.setState({
          results: page === 1 ? arr.hits : [...results, ...arr.hits],
          status: "resolved",
        });
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
    this.setState(({ page, status }) => ({
      page: page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevKeyWord = prevProps.searchWord;
    const keyWord = this.props.searchWord;
    const { page } = this.state;

    if (prevKeyWord !== keyWord || prevState.page !== page) {
      return prevKeyWord !== keyWord
        ? this.fetchAPI(keyWord, 1)
        : this.fetchAPI(keyWord, page);
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
    if (status === "rejected") {
      return <h2>{error}</h2>;
    }

    return (
      <>
        <GalleryList>
          {results?.map((result) => (
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
}
