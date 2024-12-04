import MyHero from "./MyHero";
import MyCards from "./MyCards";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import MySearch from "./MySearch";
import Carousel from "react-multi-carousel";

const MyHome = () => {
  const films = useSelector((state) => state.proiezioni.proiezioni);
  const senzaproiezioni = useSelector(
    (state) => state.senzaproiezioni.senzaproiezioni
  );
  const isLoading = films.length === 0;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1200, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const responsive2 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1200, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const generi = ["AZIONE", "COMMEDIA", "DRAMMA", "FANTASY", "CRIME", "THRILLER", "HORROR"];

  const altriGeneri = films.content
    ? films.content.filter((film) => !generi.includes(film.genere))
    : [];

  return (
    <Col className="col-12 col-xl-6 p-0 h-100 overflow-card">
      <div className="position-relative">
        <Carousel
          responsive={responsive2}
          infinite={true}
          autoPlay={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {isLoading
            ? Array.from({ length: 1 }).map((_, index) => (
                <MyHero key={index} isLoading={true} />
              ))
            : (senzaproiezioni.content || []).map((senzaproiezioni, index) => (
                <MyHero key={index} senzaproiezioni={senzaproiezioni} />
              ))}
        </Carousel>
        <div className="w-100 position-absolute prossimamente translate-middle text-center border-1 fw-bold">
          <p>COMING SOON</p>
        </div>
      </div>

      <MySearch />
      <Row className="p-0 m-0 flex-column">
        {generi.map((genere) => {
          const filmsByGenre = films.content
            ? films.content.filter((film) => film.genere === genere)
            : [];

          if (filmsByGenre.length === 0) return null;

          return (
            <Col key={genere} className="mb-4">
              <h3 className="text-start text-uppercase text-secondary">{genere}</h3>
              <Carousel
                responsive={responsive}
                infinite={true}
                itemClass="m-1"
                removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <MyCards key={index} isLoading={true} />
                    ))
                  : filmsByGenre.map((film, index) => (
                      <MyCards key={index} film={film} />
                    ))}
              </Carousel>
            </Col>
          );
        })}

        {altriGeneri.length > 0 && (
          <Col className="mb-4">
            <h3 className="text-start text-uppercase text-secondary">Altri Generi</h3>
            <Carousel
              responsive={responsive}
              infinite={true}
              itemClass="m-1"
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <MyCards key={index} isLoading={true} />
                  ))
                : altriGeneri.map((film, index) => (
                    <MyCards key={index} film={film} />
                  ))}
            </Carousel>
          </Col>
        )}
      </Row>
    </Col>
  );
};

export default MyHome;
