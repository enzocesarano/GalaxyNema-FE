import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";

const FilmsAdmin = ({ onFilmSelect }) => {
  const films = useSelector((state) => state.proiezioni.proiezioni);
  const senzaproiezioni = useSelector(
    (state) => state.senzaproiezioni.senzaproiezioni
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const handleDelete = (filmId) => {
    console.log("Cancellazione film con ID:", filmId);
  };

  const handleEdit = (film) => {
    setSelectedFilm(film);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedFilm({
      titolo: "",
      descrizione: "",
      durata: "",
      genere: "",
      dataUscita: "",
      poster_url: "",
      backdrop_url: "",
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFilm(null);
  };

  const handleSaveChanges = () => {
    console.log("Salvataggio modifiche:", selectedFilm);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredFilms = films.content.filter((film) => {
    const matchesSearchQuery =
      film.titolo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.descrizione.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = genreFilter ? film.genere === genreFilter : true;

    return matchesSearchQuery && matchesGenre;
  });

  const filteredFilmsWithoutProiezions = senzaproiezioni.content.filter(
    (film) => {
      const matchesSearchQuery =
        film.titolo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.descrizione.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre = genreFilter ? film.genere === genreFilter : true;
      return matchesSearchQuery && matchesGenre;
    }
  );

  const handleViewProjections = (filmId) => {
    console.log("Visualizza le proiezioni per il film con ID:", filmId);
    onFilmSelect(filmId);
  };

  return (
    <div className="films-admin h-100 overflow-card">
      <div className="d-flex mb-4 p-2">
        <Form.Control
          type="text"
          placeholder="Cerca film..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small me-2"
        />
        <Form.Select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small me-2 w-25"
        >
          <option value="">GENERE</option>
          <option value="AZIONE">AZIONE</option>
          <option value="AVVENTURA">AVVENTURA</option>
          <option value="ANIMAZIONE">ANIMAZIONE</option>
          <option value="COMMEDIA">COMMEDIA</option>
          <option value="CRIME">CRIME</option>
          <option value="DOCUMENTARIO">DOCUMENTARIO</option>
          <option value="DRAMMA">DRAMMA</option>
          <option value="FAMIGLIA">FAMIGLIA</option>
          <option value="FANTASY">FANTASY</option>
          <option value="STORIA">STORIA</option>
          <option value="HORROR">HORROR</option>
          <option value="MUSICA">MUSICA</option>
          <option value="MISTERO">MISTERO</option>
          <option value="ROMANCE">ROMANCE</option>
          <option value="FANTASCIENZA">FANTASCIENZA</option>
          <option value="TELEVISIONE_FILM">TELEVISIONE FILM</option>
          <option value="THRILLER">THRILLER</option>
          <option value="GUERRA">GUERRA</option>
          <option value="WESTERN">WESTERN</option>
        </Form.Select>

        <Button
          onClick={handleAdd}
          className=" button-check border-0 rounded-4 text-black fw-bold fs-small w-25"
        >
          Aggiungi Film
        </Button>
      </div>

      <div className="text-light mb-4">
        <h3>Film con Proiezioni</h3>
        {filteredFilms.length > 0 ? (
          <table className="table table-striped table-dark mb-5">
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Descrizione</th>
                <th>Durata</th>
                <th>Genere</th>
                <th>Data Uscita</th>
                <th>Poster</th>
                <th>Backdrop</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredFilms.map((film, index) => (
                <tr key={index}>
                  <td style={{ width: "20%" }}>{film.titolo}</td>
                  <td style={{ width: "30%" }}>
                    {film.descrizione.slice(0, 50)}
                  </td>
                  <td>{film.durata} min</td>
                  <td>{film.genere}</td>
                  <td>{film.dataUscita}</td>
                  <td className="text-center">
                    {film.poster_url && (
                      <img
                        src={film.poster_url}
                        alt="Poster"
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {film.backdrop_url && (
                      <img
                        src={film.backdrop_url}
                        alt="Backdrop"
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleEdit(film)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() => handleDelete(film.id_film)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => handleViewProjections(film)}
                      >
                        <i className="bi bi-camera-reels"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nessun film con proiezioni disponibile.</p>
        )}
      </div>

      <div className="text-light">
        <h3>Film senza Proiezioni</h3>
        {filteredFilmsWithoutProiezions.length > 0 ? (
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Descrizione</th>
                <th>Durata</th>
                <th>Genere</th>
                <th>Data Uscita</th>
                <th>Poster</th>
                <th>Backdrop</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredFilmsWithoutProiezions.map((film, index) => (
                <tr key={index}>
                  <td style={{ width: "20%" }}>{film.titolo}</td>
                  <td style={{ width: "30%" }}>
                    {film.descrizione.slice(0, 50)}
                  </td>
                  <td>{film.durata} min</td>
                  <td>{film.genere}</td>
                  <td>{film.dataUscita}</td>
                  <td className="text-center">
                    {film.poster_url && (
                      <img
                        src={film.poster_url}
                        alt="Poster"
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {film.backdrop_url && (
                      <img
                        src={film.backdrop_url}
                        alt="Backdrop"
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleEdit(film)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(film.id_film)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nessun film senza proiezioni disponibile.</p>
        )}
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="bg-dark text-white border-0">
          {selectedFilm ? (
            <Modal.Title>Modifica Film {selectedFilm.id_film}</Modal.Title>
          ) : (
            <Modal.Title>Aggiungi Nuovo Film</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body className="bg-dark text-white border-0">
          {selectedFilm && (
            <Form>
              <Form.Group controlId="formFilmTitolo" className="mb-3">
                <Form.Label>Titolo</Form.Label>
                <Form.Control
                  type="text"
                  name="titolo"
                  value={selectedFilm.titolo}
                  onChange={handleChange}
                  placeholder="Inserisci il titolo del film"
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
              <Form.Group controlId="formFilmDescrizione" className="mb-3">
                <Form.Label>Descrizione</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descrizione"
                  value={selectedFilm.descrizione}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Inserisci una breve descrizione"
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
              <Form.Group controlId="formFilmDurata" className="mb-3">
                <Form.Label>Durata (in minuti)</Form.Label>
                <Form.Control
                  type="number"
                  name="durata"
                  value={selectedFilm.durata}
                  onChange={handleChange}
                  placeholder="Inserisci la durata del film"
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
              <Form.Group controlId="formFilmGenere" className="mb-3">
                <Form.Label>Genere</Form.Label>
                <Form.Control
                  as="select"
                  name="genere"
                  value={selectedFilm.genere}
                  onChange={handleChange}
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                >
                  <option value="">GENERE</option>
                  <option value="AZIONE">AZIONE</option>
                  <option value="AVVENTURA">AVVENTURA</option>
                  <option value="ANIMAZIONE">ANIMAZIONE</option>
                  <option value="COMMEDIA">COMMEDIA</option>
                  <option value="CRIME">CRIME</option>
                  <option value="DOCUMENTARIO">DOCUMENTARIO</option>
                  <option value="DRAMMA">DRAMMA</option>
                  <option value="FAMIGLIA">FAMIGLIA</option>
                  <option value="FANTASY">FANTASY</option>
                  <option value="STORIA">STORIA</option>
                  <option value="HORROR">HORROR</option>
                  <option value="MUSICA">MUSICA</option>
                  <option value="MISTERO">MISTERO</option>
                  <option value="ROMANCE">ROMANCE</option>
                  <option value="FANTASCIENZA">FANTASCIENZA</option>
                  <option value="TELEVISIONE_FILM">TELEVISIONE FILM</option>
                  <option value="THRILLER">THRILLER</option>
                  <option value="GUERRA">GUERRA</option>
                  <option value="WESTERN">WESTERN</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formFilmDataUscita" className="mb-3">
                <Form.Label>Data di Uscita</Form.Label>
                <Form.Control
                  type="date"
                  name="dataUscita"
                  value={selectedFilm.dataUscita}
                  onChange={handleChange}
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
              <Form.Group controlId="formFilmPosterUrl" className="mb-3">
                <Form.Label>Poster URL</Form.Label>
                <Form.Control
                  type="text"
                  name="poster_url"
                  value={selectedFilm.poster_url}
                  onChange={handleChange}
                  placeholder="Inserisci il URL del poster"
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
              <Form.Group controlId="formFilmBackdropUrl" className="mb-3">
                <Form.Label>Backdrop URL</Form.Label>
                <Form.Control
                  type="text"
                  name="backdrop_url"
                  value={selectedFilm.backdrop_url}
                  onChange={handleChange}
                  placeholder="Inserisci il URL del backdrop"
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-0">
          <Button
            className="button-check border-0 rounded-4 text-black fw-bold fs-small"
            onClick={handleSaveChanges}
          >
            {selectedFilm?.id_film ? "Salva Modifiche" : "Aggiungi Film"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FilmsAdmin;
