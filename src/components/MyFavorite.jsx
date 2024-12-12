import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPreferiti } from "../redux/actions";

const MyFavorites = ({ films }) => {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreferiti());
  }, [dispatch]);

  const renderStars = (vote) => {
    const vote2 = vote / 2;
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < vote2) {
        starArray.push(
          <i key={i} className="bi bi-star-fill text-warning textStar me-1"></i>
        );
      } else {
        starArray.push(
          <i key={i} className="bi bi-star text-warning textStar me-1"></i>
        );
      }
    }
    return starArray;
  };

  const toggleDescription = (filmId) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [filmId]: !prevState[filmId],
    }));
  };

  return (
    <Col className="col-12 col-xl-6 p-0 m-0 h-100 colFavorite overflow-card mb-5">
      {films.map((film) => (
        <div key={film.id_film} className="m-2 mb-3 border border-0 border-bottom border-secondary">
          <Link
            to={`/film/${film.id_film}`}
            className="text-decoration-none"
            onClick={() =>
              localStorage.setItem(`selectedFilm`, JSON.stringify(film))
            }
          >
            <Card className="cards border-0 rounded-4 p-3 mb-3 bg-transparent flex-row">
              <div className="w-25 me-3">
                {film.poster_url && (
                  <Card.Img
                    variant="top"
                    className="rounded-4 w-100"
                    src={film.poster_url}
                    alt={film.titolo}
                  />
                )}
              </div>

              <Card.Body className="text-secondary w-75 m-0 p-0 flex-column justify-content-between">
                <div className="d-flex px-md-5 mb-4">
                  <div>
                    <p className="textTitle m-0 mb-1 me-3">
                      {film.titolo}{" "}
                    </p>
                    <p className="textGen m-0">{film.genere}</p>
                    <div className="d-flex  align-items-center p-0 m-0 my-xl-2 pb-xl-3">
                      {renderStars(film.voteAverage)}
                    </div>

                    <div className="w-100 d-none d-lg-block">
                      <p className="fs-6 m-0">
                        {expandedDescriptions[film.id_film]
                          ? film.descrizione
                          : `${film.descrizione.slice(0, 150)}...`}
                      </p>
                    </div>

                    <button
                      className="btn btn-link d-none d-lg-block text-warning p-0 mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDescription(film.id_film);
                      }}
                    >
                      {expandedDescriptions[film.id_film] ? (
                        <i className="bi bi-chevron-up"></i>
                      ) : (
                        <i className="bi bi-chevron-down"></i>
                      )}
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </div>
      ))}
    </Col>
  );
};

export default MyFavorites;
