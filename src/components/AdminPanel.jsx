import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CalendarAdmin from "./CalendarAdmin";
import FilmsAdmin from "./FilmsAdmin";
import { Link } from "react-router-dom";
import ProiezioniAdmin from "./ProiezioniAdmin";

const AdminPanel = () => {
  const [activePanel, setActivePanel] = useState("calendar");
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedProjection, setSelectedProjection] = useState(null);

  const handleFilmIdChange = (film) => {
    setSelectedFilm(film);
    setSelectedProjection(null);
  };

  const handleSaveChanges = ({ proiezione, film }) => {
    setSelectedProjection(proiezione);
    setSelectedFilm(film);
    setActivePanel("proiezioni");
  };

  useEffect(() => {
    if (selectedFilm && Object.keys(selectedFilm).length > 0) {
      setActivePanel("proiezioni");
    }
  }, [selectedFilm]);

  const renderPanel = () => {
    if (activePanel === "calendar") {
      return <CalendarAdmin onProjectionSelect={handleSaveChanges} />;
    } else if (activePanel === "films") {
      return <FilmsAdmin onFilmSelect={handleFilmIdChange} />;
    } else if (activePanel === "proiezioni") {
      return <ProiezioniAdmin selectedFilm={selectedFilm} selectedProjection={selectedProjection}  />;
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

          <Link
            className={`nav-link fw-bold p-2 px-3 rounded-start-4 text-center cursor-pointer ${
              activePanel === "proiezioni" ? "active" : "text-secondary"
            }`}
            onClick={() => setActivePanel("proiezioni")}
          >
            <i className="bi bi-camera-reels fs-4 m-0 me-xl-2"></i>
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
