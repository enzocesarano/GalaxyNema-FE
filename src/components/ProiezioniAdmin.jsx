import React, { useState } from "react";
import dayjs from "dayjs"; // Importa dayjs
import { Modal, Button, Form } from "react-bootstrap";

const ProiezioniAdmin = ({ selectedFilm, selectedProjection }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProiezione, setSelectedProiezione] = useState(null);

  const proiezioni = selectedFilm?.proiezioneList || [];

  const filteredProiezioni = selectedProjection
    ? [selectedProjection]
    : proiezioni;

  const handleClose = () => setShowModal(false);

  const handleShow = (proiezione) => {
    setSelectedProiezione(proiezione);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sala") {
      setSelectedProiezione((prevState) => ({
        ...prevState,
        sala: { nome: value },
      }));
    } else if (name === "moltiplicatore_prezzo") {
      setSelectedProiezione((prevState) => ({
        ...prevState,
        moltiplicatore_prezzo: parseFloat(value),
      }));
    } else {
      setSelectedProiezione((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = () => {
    console.log("Salvando modifiche per la proiezione:", selectedProiezione);
    handleClose();
  };

  return (
    <div className="h-100 overflow-card">
      {selectedFilm ? (
        <div>
          <h3 className="text-light">{selectedFilm.titolo}</h3>
          {filteredProiezioni.length > 0 ? (
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Id Proiezione</th>
                  <th>Sala</th>
                  <th>Data Proiezione</th>
                  <th>Ora Inizio</th>
                  <th>Ora Fine</th>
                  <th>Moltiplicatore</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody className="text-light">
                {filteredProiezioni.map((proiezione, index) => (
                  <tr key={index}>
                    <td>{proiezione.id_proiezione}</td>
                    <td>{proiezione.sala.nome}</td>
                    <td>{proiezione.dataProiezione}</td>
                    <td>{dayjs(proiezione.oraInizio).format("HH:mm")}</td>
                    <td>{dayjs(proiezione.oraFine).format("HH:mm")}</td>
                    <td>{proiezione.moltiplicatore_prezzo.toFixed(1)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleShow(proiezione)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nessuna proiezione disponibile per questo film.</p>
          )}
        </div>
      ) : selectedProjection ? (
        <div>
          <h3 className="text-light">Proiezione Selezionata</h3>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>Id Proiezione</th>
                <th>Sala</th>
                <th>Data Proiezione</th>
                <th>Ora Inizio</th>
                <th>Ora Fine</th>
                <th>Moltiplicatore</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody className="text-light">
              <tr>
                <td>{selectedProjection.id_proiezione}</td>
                <td>{selectedProjection.sala?.nome}</td>
                <td>{selectedProjection.dataProiezione}</td>
                <td>{dayjs(selectedProjection.oraInizio).format("HH:mm")}</td>
                <td>{dayjs(selectedProjection.oraFine).format("HH:mm")}</td>
                <td>{selectedProjection.moltiplicatore_prezzo.toFixed(1)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => handleShow(selectedProjection)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Seleziona un film o una proiezione per vedere i dettagli.</p>
      )}

      <Modal show={showModal} onHide={handleClose} size="lg" dialogClassName="modal-dialog-centered" backdropClassName="custom-modal-backdrop">
        <Modal.Header closeButton className="bg-dark text-white border-0">
          <Modal.Title>Modifica Proiezione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white border-0">
          {selectedProiezione && (
            <Form>
              <Form.Group controlId="formProiezioneData" className="mb-3">
                <Form.Label>Data Proiezione</Form.Label>
                <Form.Control
                  type="date"
                  name="dataProiezione"
                  value={dayjs(selectedProiezione.dataProiezione).format("YYYY-MM-DD")}
                  onChange={handleChange}
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
              <Form.Group controlId="formProiezioneOraInizio" className="mb-3">
                <Form.Label>Ora Inizio</Form.Label>
                <Form.Control
                  type="time"
                  name="oraInizio"
                  value={dayjs(selectedProiezione.oraInizio).format("HH:mm")}
                  onChange={handleChange}
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
              <Form.Group controlId="formProiezioneSala" className="mb-3">
                <Form.Label>Sala</Form.Label>
                <Form.Control
                  as="select"
                  name="sala"
                  value={selectedProiezione.sala?.nome || ""}
                  onChange={handleChange}
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                >
                  <option value="Sala 1">Sala 1</option>
                  <option value="Sala 2">Sala 2</option>
                  <option value="Sala 3">Sala 3</option>
                  <option value="Sala 4">Sala 4</option>
                  <option value="Sala 5">Sala 5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formProiezioneMoltiplicatore" className="mb-3">
                <Form.Label>Moltiplicatore</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  name="moltiplicatore_prezzo"
                  value={selectedProiezione.moltiplicatore_prezzo || 1}
                  onChange={handleChange}
                  min="1"
                  max="2"
                  className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-0">
          <Button
            className="button-check border-0 rounded-4 text-black fw-bold fs-small mb-2"
            onClick={handleSaveChanges}
          >
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProiezioniAdmin;
