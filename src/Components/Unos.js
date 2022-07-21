import React from "react";
import { ReactComponent as Send } from "../assets/images/send.svg";

class Input extends React.Component {
  state = {
    text: "",
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
      <>
        <form
          className="input__field--container"
          onSubmit={(e) => this.onSubmit(e)}
        >
          <input
            className="input__field--field"
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Upišite poruku..."
            autoFocus={true}
          />
          <button className="input__field--button">
            <Send className="input__field--send-icon" />
          </button>
        </form>
      </>
    );
  }
}

export default Input;
