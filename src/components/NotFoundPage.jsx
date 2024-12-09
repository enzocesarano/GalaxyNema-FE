import React from "react";
import { Button, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Col className="col-12 col-xl-6 p-0 vh-100">
      <div className="d-flex h-75 justify-content-center align-items-center">
        <div className="text-center">
          <div className="w-100 mb-5 d-xl-none">
            <Image
              src="/logo.svg"
              alt="Galaxynema Logo"
              className="img-fluid w-100 "
            />
          </div>
          <p className="text-danger fw-bold display-1">404</p>
          <p className="text-secondary">
            La pagina che stai cercando non esiste.
          </p>
          <Button
            onClick={handleSubmit}
            className="w-100 p-1 mt-2 button-check border-0 rounded-4 text-black fw-bold"
          >
            Torna alla Home
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default NotFoundPage;
