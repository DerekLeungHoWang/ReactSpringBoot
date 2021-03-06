import React, { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../../api/todo/HellowWorldService";

export default class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage: "",
    };
    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  retrieveWelcomeMessage() {
    // HelloWorldService.executeHelloWordService().then((response) => {
    //   this.handleSuccessfulResponse(response)
    // });

    // HelloWorldService.executeHelloWordBeanService().then((response) => {
    //     this.handleSuccessfulResponse(response)
    //   });

    HelloWorldService.executeHelloWordPathVariableService(
      this.props.match.params.name
    )
      .then((response) => {
        this.handleSuccessfulResponse(response);
      })
      .catch((error) => this.handleError(error));
  }

  handleSuccessfulResponse(response) {
    this.setState({
      welcomeMessage: response.data.message,
    });
  }

  handleError(error) {

    let errorMessage = '';
    if(error.message)
        errorMessage+=error.message
        if(error.response && error.response.data){
            errorMessage+=error.response.data.message
        }
    this.setState({ welcomeMessage: errorMessage });
  }

  render() {
    return (
      <>
        <h1>Welcome</h1>
        <div className="container">
          Welcome {this.props.match.params.name}. You can manage your todos{" "}
          <Link to="/todo"> here </Link>
        </div>
        <div className="container">
          Click heres to get a customized welcome message.
          <button
            className="btn btn-success"
            onClick={this.retrieveWelcomeMessage}
          >
            Get Welcome Message
          </button>
        </div>
        <div className="container">{this.state.welcomeMessage}</div>
      </>
    );
  }
}
