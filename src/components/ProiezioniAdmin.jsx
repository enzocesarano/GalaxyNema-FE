import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Modal, Button, Form } from "react-bootstrap";
import {
  addProiezione,
  deleteProiezioni,
  filmsArray,
  filmsWhitoutProiezioni,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const ProiezioniAdmin = ({ selectedFilm, selectedProjection }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProiezione, setSelectedProiezione] = useState(null);
  const [proiezioneToDelete, setProiezioneToDelete] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const dispatch = useDispatch();
  const sale = useSelector((store) => store.getSale.getSale);
  const filmConProiezioni = useSelector((store) => store.proiezioni.proiezioni);
  const [proiezioni, setProiezioni] = useState(
    selectedFilm?.proiezioneList || []
  );
  const filteredProiezioni = selectedProjection
    ? [selectedProjection]
    : proiezioni;

  useEffect(() => {
    if (selectedFilm) {
      const updatedFilm = filmConProiezioni.content.find(
        (film) => film.id_film === selectedFilm.id_film
      );
      if (updatedFilm) {
        setProiezioni(updatedFilm.proiezioneList);
      }
    }
  }, [filmConProiezioni, selectedFilm, updateFlag]);

  const handleClose = () => setShowModal(false);

  const handleShow = (proiezione) => {
    setSelectedProiezione({
      id_proiezione: proiezione.id_proiezione || null,
      dataProiezione: proiezione.dataProiezione || "",
      oraInizio: dayjs(proiezione.oraInizio).format("HH:mm") || "",
      moltiplicatore_prezzo: proiezione.moltiplicatore_prezzo || 1,
      id_sala: proiezione.sala?.id_sala || "",
    });
    setShowModal(true);
  };

  const handleAddNewProiezione = () => {
    setSelectedProiezione({
      id_proiezione: null,
      dataProiezione: "",
      oraInizio: "",
      moltiplicatore_prezzo: 1,
      id_sala: "",
    });
    setShowModal(true);
  };

  const handleDeleteShow = (proiezione) => {
    setProiezioneToDelete(proiezione);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProiezione((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (selectedProiezione) {
      const { dataProiezione, oraInizio, moltiplicatore_prezzo, id_sala } =
        selectedProiezione;
      const newProiezione = {
        dataProiezione,
        oraInizio,
        moltiplicatore_prezzo: parseFloat(moltiplicatore_prezzo),
      };

      const idFilm = selectedFilm.id_film;
      dispatch(addProiezione(newProiezione, id_sala, idFilm))
        .then(() => {
          dispatch(filmsArray());
          dispatch(filmsWhitoutProiezioni());
        })
        .catch((error) => {
          console.error("Errore durante l'aggiunta della proiezione:", error);
        });
      setShowModal(false);
    }
  };

  const handleDelete = async () => {
    if (proiezioneToDelete) {
      try {
        await dispatch(deleteProiezioni(proiezioneToDelete.id_proiezione));
        dispatch(filmsArray());
        dispatch(filmsWhitoutProiezioni());
        setProiezioneToDelete(null);
        setShowDeleteModal(false);
      } catch (error) {
        console.error(
          "Errore durante la cancellazione della proiezione:",
          error
        );
      }
    }
  };

  return (
    <div className="h-100 overflow-card">
      {selectedFilm ? (
        <div className="p-2 ">
          <h3 className="text-light d-flex justify-content-between  mb-4">
            {selectedFilm.titolo}
            <Button
              onClick={handleAddNewProiezione}
              className="button-check border-0 rounded-4 text-black fw-bold fs-small"
            >
              Aggiungi Proiezione
            </Button>
          </h3>
          {filteredProiezioni.length > 0 ? (
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Id Proiezione</th>
                  <th>Sala</th>
                  <th>Data Proiezione</th>
                  <th>Ora Inizio</th>
                  <th>Moltiplicatore</th>
                  <th>Totale Biglietti</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody className="text-light">
                {filteredProiezioni.map((proiezione, index) => (
                  <tr key={index}>
                    <td>{proiezione.id_proiezione}</td>
                    <td>{proiezione.sala?.nome}</td>
                    <td>{proiezione.dataProiezione}</td>
                    <td>{dayjs(proiezione.oraInizio).format("HH:mm")}</td>
                    <td>{proiezione.moltiplicatore_prezzo.toFixed(1)}</td>
                    <td>
                      {proiezione.ticketList ? proiezione.ticketList.length : 0}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleShow(proiezione)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className={`btn btn-sm ${
                          proiezione.ticketList &&
                          proiezione.ticketList.length > 0
                            ? "btn-outline-secondary"
                            : "btn-outline-danger"
                        }`}
                        onClick={() => handleDeleteShow(proiezione)}
                        disabled={
                          proiezione.ticketList &&
                          proiezione.ticketList.length > 0
                        }
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-light">
              Nessuna proiezione disponibile per questo film.
            </p>
          )}
        </div>
      ) : (
        <p className="text-light">
          Seleziona un film o una proiezione per vedere i dettagli.
        </p>
      )}

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="bg-dark text-white border-0">
          <Modal.Title>
            {selectedProiezione?.id_proiezione
              ? `Modifica Proiezione ${selectedProiezione?.id_proiezione}`
              : "Aggiungi Proiezione"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white border-0">
          {selectedProiezione && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Data Proiezione</Form.Label>
                <Form.Control
                  type="date"
                  name="dataProiezione"
                  value={selectedProiezione.dataProiezione}
                  onChange={handleChange}
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ora Inizio</Form.Label>
                <Form.Control
                  type="time"
                  name="oraInizio"
                  value={selectedProiezione.oraInizio}
                  onChange={handleChange}
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sala</Form.Label>
                <Form.Control
                  as="select"
                  name="id_sala"
                  value={selectedProiezione.id_sala}
                  onChange={handleChange}
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                >
                  <option value="">Seleziona Sala</option>
                  {sale?.content?.map((sala) => (
                    <option key={sala.id_sala} value={sala.id_sala}>
                      {sala.nome}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Moltiplicatore Prezzo</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  name="moltiplicatore_prezzo"
                  value={selectedProiezione.moltiplicatore_prezzo}
                  onChange={handleChange}
                  min="1"
                  max="2"
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white border-0">
          <Button
            onClick={handleSaveChanges}
            className="button-check border-0 rounded-4 text-black fw-bold fs-small mb-2"
          >
            {selectedProiezione?.id_proiezione
              ? "Salva Modifiche"
              : "Aggiungi Proiezione"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="bg-dark text-white border-0">
          <Modal.Title>Conferma Cancellazione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white border-0">
          Sei sicuro di voler cancellare questa proiezione?
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white border-0">
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            className="rounded-4 fw-bold"
          >
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            className="rounded-4 fw-bold"
          >
            Cancella
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProiezioniAdmin;
