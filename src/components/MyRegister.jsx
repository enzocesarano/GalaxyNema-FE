import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { register } from "../redux/actions";
import MyHero from "./MyHero";
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import MyCards from "./MyCards";

const MyRegister = () => {
  const films = useSelector((state) => state.proiezioni.proiezioni);

  const senzaproiezioni = useSelector(
    (state) => state.senzaproiezioni.senzaproiezioni
  );
  const isLoading = films.length === 0;

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    username: "",
    email: "",
    password: "",
    telefono: "",
    data_nascita: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,3}\d{9,15}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.nome.trim()) newErrors.nome = "Il nome è obbligatorio.";
    if (!formData.cognome.trim())
      newErrors.cognome = "Il cognome è obbligatorio.";
    if (!formData.username.trim())
      newErrors.username = "Il username è obbligatorio.";
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      newErrors.email = "Inserisci un'email valida.";
    if (!formData.password || !passwordRegex.test(formData.password))
      newErrors.password =
        "La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un carattere speciale.";
    if (!formData.telefono.trim() || !phoneRegex.test(formData.telefono))
      newErrors.telefono =
        "Inserisci un numero di telefono valido (es. +393470757363).";
    if (!formData.data_nascita)
      newErrors.data_nascita = "La data di nascita è obbligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        await register(formData);
        setSuccessMessage("Registrazione completata con successo!");
        setFormData({
          nome: "",
          cognome: "",
          username: "",
          email: "",
          password: "",
          telefono: "",
          data_nascita: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        setGeneralError(error.message);
      }
    }
  };

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

  return (
    <>
      <Col className="col-12 col-xl-6 px-3 overflow-card">
        <div className="position-relative d-xl-none">
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
              : (senzaproiezioni.content || []).map(
                  (senzaproiezioni, index) => (
                    <MyHero key={index} senzaproiezioni={senzaproiezioni} />
                  )
                )}
          </Carousel>
          <div className="w-100 position-absolute prossimamente translate-middle text-center border-1 fw-bold">
            <p>COMING SOON</p>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center align-items-xl-center">
          <Form noValidate onSubmit={handleSubmit} className="mt-3 mb-5">
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formNome">
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                    errors.nome ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.nome}</div>
              </Form.Group>

              <Form.Group as={Col} controlId="formCognome">
                <Form.Control
                  type="text"
                  placeholder="Cognome"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleInputChange}
                  className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                    errors.cognome ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.cognome}</div>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                  errors.email ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTelefono">
              <Form.Control
                type="text"
                placeholder="Numero di telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className={`rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2 ${
                  errors.telefono ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.telefono}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDataNascita">
              <Form.Control
                type="date"
                name="data_nascita"
                value={formData.data_nascita}
                onChange={handleInputChange}
                className={`rounded-4 px-4 py-2 text-secondary placeholder-light bg-black border-0 mb-2 ${
                  errors.data_nascita ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.data_nascita}</div>
            </Form.Group>

            {successMessage && (
              <p className="text-success fs-6 mt-2">{successMessage}</p>
            )}

            {generalError && (
              <p className="text-danger fs-6 mt-2">{generalError}</p>
            )}

            <div className="d-flex justify-content-end">
              <Button
                className="botton-check border-0 rounded-4 text-black fw-bold"
                type="submit"
              >
                Registrati
              </Button>
            </div>
          </Form>
        </div>

        <Carousel
          responsive={responsive}
          infinite={true}
          itemClass="m-1"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          className="mb-5 d-xl-none"
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <MyCards key={index} isLoading={true} />
              ))
            : (films.content || []).map((film, index) => (
                <MyCards key={index} film={film} />
              ))}
        </Carousel>
      </Col>
    </>
  );
};

export default MyRegister;
