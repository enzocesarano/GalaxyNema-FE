import React from "react";
import { Col, Row } from "react-bootstrap";
import CalendarAdmin from "./CalendarAdmin";
import FilmsAdmin from "./FilmsAdmin";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [activePanel, setActivePanel] = useState("calendar");
  const renderPanel = () => {
    if (activePanel === "calendar") {
      return <CalendarAdmin />;
    } else if (activePanel === "films") {
      return <FilmsAdmin />;
    }
  };

  return (
    <Col className="col-12 col-xl-10 m-0 p-4 h-100 mb-5 mb-xl-0">
      <Row className="p-0 m-0 h-100">
        <Col className="col-1 p-0 m-0 pt-3">
          
            <Link
              className={`nav-link fw-bold p-2 px-3 rounded-start-4 text-center cursor-pointer ${
                activePanel === "calendar" ? "active" : "text-secondary"
              }`}
              onClick={() => setActivePanel("calendar")}
            >
              <i className="bi bi-calendar-date m-0 me-xl-2 fs-4"></i>
            </Link>
       
        
            <Link
              className={`nav-link fw-bold p-2 px-3 rounded-start-4 text-center cursor-pointer ${
                activePanel === "films" ? "active" : "text-secondary"
              }`}
              onClick={() => setActivePanel("films")}
            >
              <i className="bi bi-film fs-4 m-0 me-xl-2"></i>
            </Link>
       
        </Col>
        <Col className="col-11 p-0 m-0 p-4 border borderColor h-100 rounded-4">
          {renderPanel()}
        </Col>
      </Row>
    </Col>
  );
};

export default AdminPanel;
