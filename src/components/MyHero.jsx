import { Image, Spinner } from "react-bootstrap";

const MyHero = ({ senzaproiezioni, isLoading }) => {
  if (isLoading) {
    return (
      <div
        className="mb-4 bg-dark rounded-4 position-relative d-flex justify-content-center align-items-center"
        style={{ height: "20rem" }}
      >
        <Spinner animation="border" size="lg" variant="secondary" />
      </div>
    );
  }

  const renderStars = (vote) => {
    const vote2 = (vote/2)
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < vote2) {
        starArray.push(
          <i key={i} className="bi bi-star-fill text-warning fs-supersmall me-1"></i>
        );
      } else {
        starArray.push(
          <i key={i} className="bi bi-star text-warning fs-supersmall me-1"></i>
        );
      }
    }
    return starArray;
  };

  return (
    <div className="mb-4 rounded-4  cursor-pointer border border-dark hero-hover position-relative">
      <Image src={senzaproiezioni.backdrop_url} className="rounded-4 w-100 hero" />

      <div className="position-absolute w-100 h-100 p-md-5 pb-3 icon-wrapper d-flex align-items-end ">
        <div className="d-flex px-5">
          <div className="w-25 me-3 d-none d-md-block">
            <Image
              src={senzaproiezioni.poster_url}
              className=" w-100 rounded-4"
            />
          </div>
          <div className="me-3 flex-grow-0 flex-shrink-0">
            <p className="text-light fs-5 m-0 mb-1 me-3">{senzaproiezioni.titolo.length > 25
                ? senzaproiezioni.titolo.substring(0, 25) + "..."
                : senzaproiezioni.titolo}</p>
            <p className="text-light fs-supersmall m-0">{senzaproiezioni.genere}</p>
            <div className="d-flex align-items-center mt-2 me-3">
              {renderStars(senzaproiezioni.voteAverage)}
            </div>
          </div>
          <div className="w-75 d-none d-md-block">
            <p className="text-light fs-small m-0 ">
              {senzaproiezioni.descrizione.length > 400
                ? senzaproiezioni.descrizione.substring(0, 400) + "..."
                : senzaproiezioni.descrizione}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHero;
