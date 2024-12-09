import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { meLogin, meUpdate, updateAvatar } from "../redux/actions";
import { Link } from "react-router-dom";

const ProfiloUtente = ({ onLogout }) => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.loginMe.loginMe);

  const [initialFormData, setInitialFormData] = useState({
    nome: logged.nome,
    cognome: logged.cognome,
    username: logged.username,
    email: logged.email,
    telefono: logged.telefono,
    data_nascita: logged.data_nascita,
    avatar: logged.avatar,
  });

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [editableField, setEditableField] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarModalShow, setAvatarModalShow] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const validateField = (field, value) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,3}\d{9,15}$/;

    switch (field) {
      case "nome":
        if (!value.trim()) newErrors.nome = "Il nome è obbligatorio.";
        break;
      case "cognome":
        if (!value.trim()) newErrors.cognome = "Il cognome è obbligatorio.";
        break;
      case "username":
        if (!value.trim()) newErrors.username = "Lo username è obbligatorio.";
        break;
      case "email":
        if (!value.trim() || !emailRegex.test(value))
          newErrors.email = "Inserisci un'email valida.";
        break;
      case "telefono":
        if (!value.trim() || !phoneRegex.test(value))
          newErrors.telefono =
            "Inserisci un numero di telefono valido (es. +393470757363).";
        break;
      case "data_nascita":
        if (!value.trim())
          newErrors.data_nascita = "La data di nascita è obbligatoria.";
        break;
      default:
        break;
    }
    return newErrors;
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      newErrors = { ...newErrors, ...validateField(field, formData[field]) };
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (field) => {
    if (editableField === field) {
      setFormData({ ...formData, [field]: initialFormData[field] });
      setEditableField(null);
      setErrors({});
    } else {
      setEditableField(field);
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setLoading(true);
      try {
        
        dispatch(meUpdate(formData));
        dispatch(meLogin());

        setInitialFormData(formData);
        setSuccessMessage("Profilo aggiornato con successo!");
        setFormData({ ...formData });
        setEditableField(null);
        setErrors({});

        setTimeout(() => {
          setSuccessMessage("");
        }, 1500);
      } catch (error) {
        console.error("Errore durante l'aggiornamento del profilo:", error);
        setErrors({ general: error.message });
        setSuccessMessage("");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleAvatarSubmit = async () => {
    if (avatarFile) {
      setLoading(true);
      try {
        await updateAvatar(avatarFile);
        dispatch(meLogin());
        setAvatarModalShow(false);
        setSuccessMessage("Avatar aggiornato con successo!");
      } catch (error) {
        setErrors({ general: error.message });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    dispatch(meLogin())
  }, [dispatch])

  const isFormModified =
    JSON.stringify(formData) !== JSON.stringify(initialFormData);

  const isFormValid = isFormModified && Object.keys(errors).length === 0;

  return (
    <Col className="col-12 col-xl-6 m-0 px-2 mb-5">
      <div className="text-center mb-4">
        <img
          src={logged.avatar || "default-avatar.png"}
          className="rounded-circle"
          width={150}
          height={150}
          alt="Avatar"
          onClick={() => setAvatarModalShow(true)}
          style={{ cursor: "pointer" }}
        />
        <h3 className="text-white mt-2">{formData.username}</h3>
      </div>

      <Form onSubmit={handleSubmit} className=" p-0 m-0 mb-3">
        {[
          { field: "nome" },
          { field: "cognome" },
          { field: "username" },
          { field: "email" },
          { field: "telefono" },
          { field: "data_nascita", type: "date" },
        ].map(({ field, type }) => (
          <Form.Group as={Row} key={field} className="p-0 m-0 mb-3" >
            <Col className="p-0 m-0 me-2">
              <Form.Control
                type={type || "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                disabled={editableField !== field}
                className={`rounded-4 px-4 py-2 text-light placeholder-light ${
                  editableField === field
                    ? "bg-black border-Pimary"
                    : "bg-secondary border-0"
                } ${errors[field] ? "is-invalid border-0" : ""}`}
              />
              <div className="invalid-feedback">{errors[field]}</div>
            </Col>
            <Col xs="auto" className="p-0 m-0">
              <Button
                className={`rounded-4 fw-bold py-2 ${
                  editableField === field
                    ? "btn-danger border-0 text-light"
                    : "button-check border-0 text-black"
                }`}
                onClick={() => handleEditClick(field)}
              >
                {editableField === field ? (
                  <i className="bi bi-x-circle-fill"></i>
                ) : (
                  <i className="bi bi-pencil-square"></i>
                )}
              </Button>
            </Col>
          </Form.Group>
        ))}

        <div className="d-flex justify-content-end mt-4">
          <Button
            type="submit"
            className={`button-check border-0 text-black rounded-4 fw-bold px-4 ${
              !isFormValid || loading ? "bg-secondary" : ""
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Caricamento..." : "Aggiorna Profilo"}
          </Button>
        </div>

        {successMessage && (
          <p className="text-success text-center mt-3 mb-5">{successMessage}</p>
        )}

        {errors.general && (
          <p className="text-danger text-center mt-3 mb-5">{errors.general}</p>
        )}
      </Form>

      <div className="d-flex justify-content-center d-xl-none mb-4">
        <div>
          <Link to="/" className="nav-link fw-bold p-2 px-3 rounded-4 w-auto text-danger" onClick={onLogout}>Logout
          </Link>
        </div>
      </div>

      <Modal show={avatarModalShow} onHide={() => setAvatarModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cambia Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="avatarUpload">
              <Form.Label>Seleziona un nuovo avatar:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleAvatarSubmit}
            disabled={!avatarFile || loading}
          >
            {loading ? "Caricamento..." : "Aggiorna Avatar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default ProfiloUtente;
