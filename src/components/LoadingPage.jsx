import React from "react";
import { Col, Image, Spinner } from "react-bootstrap";

const LoadingPage = () => {
  return (
    <Col className="d-flex justify-content-center text-center vh-100 m-0 p-0 py-5 bg-dark">
      <div className="mediaScreen mt-5">
        <Image
          src="/logo.svg"
          alt="Galaxynema Logo"
          className="img-fluid"
        />
        <Spinner animation="border" size="lg" variant="secondary" className="mt-5"/>
      </div>
      
    </Col>
  );
};

export default LoadingPage;
