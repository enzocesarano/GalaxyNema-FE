import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyCards = ({ film }) => {

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
