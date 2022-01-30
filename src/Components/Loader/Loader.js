import { Component } from "react";
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { BallTriangle } from "react-loader-spinner";

import { LoaderContainer } from "./Loader.styled";

class Loader extends Component {
  render() {
    return (
      <LoaderContainer>
        <BallTriangle />
      </LoaderContainer>
    );
  }
}

export default Loader;
