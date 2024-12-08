import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="text-center">
        <img
          src="/logo.svg"
          alt="Logo"
          className="mb-4 w-75"
        />
        <Spinner animation="border" variant="light" />
      </div>
    </div>
  );
};

export default LoadingScreen;
