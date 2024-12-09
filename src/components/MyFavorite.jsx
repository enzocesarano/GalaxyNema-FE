import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyFavorites = ({ films }) => {
  return (
    <Col className="col-12 col-xl-6 p-0 m-0 h-100 overflow-card mb-5">
        {films.map((film) => (
          <div key={film.id_film} className="m-1 w-25">
            <Link
              to={`/film/${film.id_film}`}
              className="text-decoration-none"
              onClick={() =>
                localStorage.setItem(`selectedFilm`, JSON.stringify(film))
              }
            >
              <Card className="cards rounded-4  bg-transparent border-dark p-2 cursor-pointer">
                <div className="card-img-container w-100">
                  <Card.Img src={film.poster_url} alt={film.title} />
                </div>
              </Card>
            </Link>
          </div>
        ))}
    </Col>
  );
};

export default MyFavorites;
