import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error occurred: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/Login" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
