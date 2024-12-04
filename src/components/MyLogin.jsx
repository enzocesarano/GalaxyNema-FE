import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login, meLogin } from "../redux/actions"; 
import { useDispatch } from "react-redux";


const MyLogin = ({ onLoginSuccess }) => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      onLoginSuccess();
      dispatch(meLogin());
    } catch (error) {
      setErrorMessage("Credenziali errate, per favore riprova.");
      setFormData({
        username: "",
        password: "",
      });
    }
  };


  return (
    <div className="flex-grow-1">
      <p className="text-secondary fw-bold px-3 w-100 text-center text-xl-start rounded-4 fs-4 m-0 mb-3">
        Login<i className="bi bi-arrow-right-circle-fill ms-3 fs-5"></i>
      </p>
      <Form className="mb-2" onSubmit={handleSubmit}>
        <Form.Control
          required
          type="text"
          name="username"
          placeholder="Username..."
          className="rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light mb-2"
          aria-label="username"
          value={formData.username}
          onChange={handleChange}
        />
        <Form.Control
          required
          type="password"
          name="password"
          placeholder="Password..."
          className="rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light"
          aria-label="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errorMessage && (
          <p className="text-danger fs-small text-center mt-2">{errorMessage}</p>
        )}
        <Button type="submit" className="w-100 p-1 mt-2 botton-check border-0 rounded-4 text-black fw-bold">
          Accedi
        </Button>
      </Form>

      <Link to={"/register"} className="nav-link text-secondary text-center text-xl-start fw-bold w-100 p-2 px-3 mb-3 mb-xl-0 rounded-4">
        <i className="bi bi-cursor-fill me-2"></i>Oppure registrati
      </Link>
    </div>
  );
};

export default MyLogin;
