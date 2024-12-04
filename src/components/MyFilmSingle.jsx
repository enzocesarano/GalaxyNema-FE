import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addPreferiti,
  removePreferiti,
  selectProiezioneAction,
} from "../redux/actions";
import Carousel from "react-multi-carousel";
import MyDaily from "./MyDaily";

const MyFilmSingle = () => {
  dayjs.locale("it-IT");
  const { id } = useParams();
  const dispatch = useDispatch();
  const proiezioni = useSelector((store) => store.proiezioni.proiezioni);

  const preferiti = useSelector((state) => state.preferiti.preferiti);
  const [isFavorite, setIsFavorite] = useState(false);

  const film = proiezioni.content
    ? proiezioni.content.find((film) => film.id_film === id)
    : null;

  const toggleFavorite = () => {
    try {
      if (isFavorite) {
        dispatch(removePreferiti(film));
        setIsFavorite(false);
      } else {
        dispatch(addPreferiti(film));
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Errore nella gestione dei preferiti:", err);
    }
  };

  useEffect(() => {
    if (film) {
      setIsFavorite(preferiti.some((f) => f.id_film === film.id_film));
    }
  }, [preferiti, film]);

  const [selectedProiezione, setSelectedProiezione] = useState(null);
  const [selectedSala, setSelectedSala] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    if (selectedProiezione) {
      dispatch(selectProiezioneAction(selectedProiezione));
    }
  }, [selectedProiezione, dispatch]);

  useEffect(() => {
    if (film) {
      const firstSala = film.proiezioneList[0].sala.nome;
      setSelectedSala(firstSala);

      const firstFilteredDays = film.proiezioneList
        .filter((proiezione) => proiezione.sala.nome === firstSala)
        .map((proiezione) => dayjs(proiezione.dataProiezione).format("DD-MM"))
        .filter((value, index, self) => self.indexOf(value) === index);
      setSelectedDay(firstFilteredDays[0]);

      const firstProiezione = film.proiezioneList.find(
        (proiezione) =>
          proiezione.sala.nome === firstSala &&
          dayjs(proiezione.dataProiezione).format("DD-MM") ===
            firstFilteredDays[0]
      );
      setSelectedProiezione(firstProiezione);
    }
  }, [film]);

  if (!film) {
    return (
      <Col className="col-10 h-100">
        <div className="rounded-4 w-100 h-100 overflow-hidden position-relative">
          <div
            className="w-100 h-100 object-fit-cover heroSingleFilm backdropfilmingle"
            style={{
              backgroundColor: "#cccccc",
            }}
          ></div>
        </div>
      </Col>
    );
  }

  const renderStars = (vote) => {
    const vote2 = vote / 2;
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < vote2) {
        starArray.push(
          <i key={i} className="bi bi-star-fill text-warning fs-small me-1"></i>
        );
      } else {
        starArray.push(
          <i key={i} className="bi bi-star text-warning fs-small me-1"></i>
        );
      }
    }
    return starArray;
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 9,
    },
    desktop: {
      breakpoint: { max: 1200, min: 768 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const filteredDays = selectedSala
    ? film.proiezioneList
        .filter((proiezione) => proiezione.sala.nome === selectedSala)
        .map((proiezione) => {
          const formattedDate = dayjs(proiezione.dataProiezione);
          const weekday = formattedDate.format("dddd");
          return {
            day: formattedDate.format("DD-MM"),
            weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
          };
        })
        .filter(
          (value, index, self) =>
            self.findIndex((v) => v.day === value.day) === index
        )
    : [];

  const filteredProiezioni =
    selectedSala && selectedDay
      ? film.proiezioneList.filter((proiezione) => {
          const isSameSala = proiezione.sala.nome === selectedSala;
          const proiezioneDate = dayjs(proiezione.dataProiezione).format(
            "DD-MM"
          );
          const isSameDay = proiezioneDate === selectedDay;

          return isSameSala && isSameDay;
        })
      : [];

  const uniqueSaleNames = [
    ...new Set(film.proiezioneList.map((proiezione) => proiezione.sala.nome)),
  ];

  return (
    <Col className="col-12 col-xl-10 h-100">
      <div className="rounded-4 w-100 h-100 overflow-hidden position-relative">
        <Image
          src={film.backdrop_url}
          className="w-100 h-100 object-fit-cover heroSingleFilm"
          alt="film background"
        />

        <div className="position-absolute top-0 w-100 h-100 p-5 flex-column justify-content-between d-none d-xl-flex">
          <div className="d-flex px-md-5 mb-4">
            <div className="w-18 me-4 flex-grow-0 flex-shrink-0">
              <Image src={film.poster_url} className="w-100 rounded-4" />
            </div>
            <div>
              <p className="text-light fs-4 m-0 mb-1 me-3">
                {film.titolo}{" "}
                <i
                  className={`bi bi-heart${
                    isFavorite ? "-fill text-danger" : ""
                  }  ms-2 cursor-pointer fs-5`}
                  onClick={toggleFavorite}
                ></i>
              </p>
              <p className="text-light fs-small m-0">{film.genere}</p>
              <div className="d-none d-sm-flex align-items-center my-2 pb-3 border-bottom">
                {renderStars(film.voteAverage)}
              </div>

              <div className="w-100">
                <p className="text-light fs-6 m-0">
                  {isDescriptionExpanded
                    ? film.descrizione
                    : `${film.descrizione.slice(0, 150)}...`}
                </p>
                <button
                  className="btn btn-link text-warning p-0 mt-2"
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                >
                  {isDescriptionExpanded ? (
                    <i className="bi bi-chevron-up"></i>
                  ) : (
                    <i className="bi bi-chevron-down"></i>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            {/* Carousel Sale */}
            <Carousel
              responsive={responsive}
              infinite={true}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            >
              {uniqueSaleNames.map((salaName, index) => (
                <div
                  key={index}
                  className={`rounded-4 border sala text-light mb-3 cursor-pointer me-2 ${
                    selectedSala === salaName ? " active" : ""
                  }`}
                  onClick={() => setSelectedSala(salaName)}
                >
                  <p className="text-center m-0 p-0 fs-small">{salaName}</p>
                </div>
              ))}
            </Carousel>

            {/* Carousel Giorni */}
            {selectedSala && (
              <Carousel
                responsive={responsive}
                infinite={true}
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              >
                {filteredDays.map((dayInfo, index) => (
                  <div
                    key={index}
                    className={`rounded-4 border sala text-light mb-3 cursor-pointer me-2 ${
                      selectedDay === dayInfo.day ? " active" : ""
                    }`}
                    onClick={() => setSelectedDay(dayInfo.day)}
                  >
                    <p className="text-center m-0 p-0 fs-small">
                      {dayInfo.weekday}, {dayInfo.day}
                    </p>
                  </div>
                ))}
              </Carousel>
            )}

            {/* Carousel Orari */}
            {selectedSala && selectedDay && (
              <Carousel
                responsive={responsive}
                infinite={true}
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              >
                {filteredProiezioni.map((proiezione, index) => (
                  <div
                    key={index}
                    className={`rounded-4 border sala text-light mb-3 cursor-pointer me-2 ${
                      selectedProiezione === proiezione ? " active" : ""
                    }`}
                    onClick={() => setSelectedProiezione(proiezione)}
                  >
                    <p className="text-center m-0 p-0 fs-small">
                      {dayjs(proiezione.oraInizio).format("HH:mm")}
                    </p>
                  </div>
                ))}
              </Carousel>
            )}
          </div>
          <div>
            <MyDaily proiezione={selectedProiezione} />
          </div>
        </div>

        <div className="mt-4 d-xl-none">
          <div className="d-flex px-md-5 mb-4">
            <div className="w-18 me-4 flex-grow-0 flex-shrink-0">
              <Image src={film.poster_url} className="w-100 rounded-4" />
            </div>
            <div>
              <p className="text-light fs-4 m-0 mb-1 me-3">
                {film.titolo}{" "}
                <i
                  className={`bi bi-heart${
                    isFavorite ? "-fill text-danger" : ""
                  }  ms-2 cursor-pointer fs-5`}
                  onClick={toggleFavorite}
                ></i>
              </p>
              <p className="text-light fs-small m-0">{film.genere}</p>
              <div className="d-none d-sm-flex align-items-center my-2 pb-3 border-bottom">
                {renderStars(film.voteAverage)}
              </div>

              <div className="w-100">
                <p className="text-light fs-6 m-0">
                  {isDescriptionExpanded
                    ? film.descrizione
                    : `${film.descrizione.slice(0, 150)}...`}
                </p>
                <button
                  className="btn btn-link text-warning p-0 mt-2"
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                >
                  {isDescriptionExpanded ? (
                    <i className="bi bi-chevron-up"></i>
                  ) : (
                    <i className="bi bi-chevron-down"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Carousel Sale */}
          <Carousel
            responsive={responsive}
            infinite={true}
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          >
            {uniqueSaleNames.map((salaName, index) => (
              <div
                key={index}
                className={`rounded-4 border sala text-light mb-3 cursor-pointer me-2 ${
                  selectedSala === salaName ? " active" : ""
                }`}
                onClick={() => setSelectedSala(salaName)}
              >
                <p className="text-center m-0 p-0 fs-small">{salaName}</p>
              </div>
            ))}
          </Carousel>

          {/* Carousel Giorni */}
          {selectedSala && (
            <Carousel
              responsive={responsive}
              infinite={true}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            >
              {filteredDays.map((dayInfo, index) => (
                <div
                  key={index}
                  className={`rounded-4 border sala text-light mb-3 cursor-pointer me-2 ${
                    selectedDay === dayInfo.day ? " active" : ""
                  }`}
                  onClick={() => setSelectedDay(dayInfo.day)}
                >
                  <p className="text-center m-0 p-0 fs-small">
                    {dayInfo.weekday}, {dayInfo.day}
                  </p>
                </div>
              ))}
            </Carousel>
          )}

          {/* Carousel Orari */}
          {selectedSala && selectedDay && (
            <Carousel
              responsive={responsive}
              infinite={true}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            >
              {filteredProiezioni.map((proiezione, index) => (
                <div
                  key={index}
                  className={`rounded-4 border sala text-light mb-3 cursor-pointer me-2 ${
                    selectedProiezione === proiezione ? " active" : ""
                  }`}
                  onClick={() => setSelectedProiezione(proiezione)}
                >
                  <p className="text-center m-0 p-0 fs-small">
                    {dayjs(proiezione.oraInizio).format("HH:mm")}
                  </p>
                </div>
              ))}
            </Carousel>
          )}
          <MyDaily proiezione={selectedProiezione} />
        </div>
      </div>
    </Col>
  );
};

export default MyFilmSingle;
