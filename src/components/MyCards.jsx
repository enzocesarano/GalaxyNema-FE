import { Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link

const MyCards = ({ film, isLoading }) => {
  if (isLoading) {
    return (
      <Card
        className="w-100 bg-dark border-0 p-2 rounded-4"
        style={{ height: "16rem" }}
      >
        <div
          className="w-100 h-75 rounded-4 bg-black"
          style={{ backgroundColor: "#343a40" }}
        ></div>
        <Card.Body className="p-2">
          <Placeholder as={Card.Title} animation="glow" className="bg-black">
            <Placeholder xs={6} className="bg-dark" />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow" className="bg-black">
            <Placeholder xs={7} className="bg-dark" />{" "}
            <Placeholder xs={4} className="bg-dark" />
          </Placeholder>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Link to={`/film/${film.id_film}`} className="text-decoration-none" onClick={() => localStorage.setItem(
      `selectedFilm`, JSON.stringify(film)
    )}>
      <Card className="cards w-100 rounded-4 bg-transparent border-dark p-2 cursor-pointer d-flex flex-column justify-content-between mb-3 mb-xl-0">
        <div className="card-img-container">
          <Card.Img
            src={film.poster_url}
            alt={film.title}
          />
        </div>
      </Card>
    </Link>
  );
};

export default MyCards;
