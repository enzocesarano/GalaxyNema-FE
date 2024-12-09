import React from "react";
import { Col, Image, Spinner } from "react-bootstrap";

const LoadingPage = () => {
  return (
    <Col className="d-flex justify-content-center text-center vh-100 w-100 m-0 p-0 bg-dark">
      <div className="w-25">
        <Image
          src="/logo.svg"
          alt="Galaxynema Logo"
          className="img-fluid w-100 "
        />
        <Spinner animation="border" size="lg" variant="secondary" className="mt-5"/>
      </div>
      
    </Col>
  );
};

export default LoadingPage;
