import { Component } from "react";

import { LoadingButton } from "./Button.styled";

class Button extends Component {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <LoadingButton type="button" onClick={this.handleClick}>
        Load more
      </LoadingButton>
    );
  }
}

export default Button;
