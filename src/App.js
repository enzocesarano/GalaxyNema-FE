import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-multi-carousel/lib/styles.css";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import MyHome from "./components/MyHome";
import MyRegister from "./components/MyRegister";
import { Col, Container, Row } from "react-bootstrap";
import MyNav from "./components/MyNav";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  filmsArray,
  filmsWhitoutProiezioni,
  getInvoices,
  getPreferiti,
  meLogin,
  newsCinema,
} from "./redux/actions";
import MyFilmSingle from "./components/MyFilmSingle";
import MyCheck from "./components/MyCheck";
import MyNews from "./components/MyNews";
import MySingleTicket from "./components/MySingleTicket";
import MyTickets from "./components/MyTickets";
import { jwtDecode } from "jwt-decode";

function App() {
  useEffect(() => {
    const APP_URL = "https://galaxynema.onrender.com/me";
    const sendPing = () => {
        fetch(APP_URL)
            .then(response => console.log(`Ping inviato! Status: ${response.status}`))
            .catch(error => console.error(`Errore nel ping: ${error}`));
    };
    const intervalId = setInterval(sendPing, 49 * 1000);
    return () => clearInterval(intervalId);
}, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      console.log(userId);
      setIsAuthenticated(true);
      dispatch(meLogin());
    } else {
      setIsAuthenticated(false);
    }

    dispatch(filmsArray());
    dispatch(filmsWhitoutProiezioni());
    dispatch(newsCinema());
    dispatch(getPreferiti());
    dispatch(getInvoices());
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const location = useLocation();

  return (
    <Container fluid className="container-fluid p-0 p-xl-4 bg-black m-0">
      <Row className="bg-dark h-100 p-0 p-4 rounded-4 m-0 overflow-hidden">
        <Col className="col-xl-2 col-12 d-xl-flex p-0 pe-xl-5 flex-column justify-content-between fixed-bottomNav bg-dark">
          <MyNav
            isAuthenticated={isAuthenticated}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        </Col>
        <Routes>
          <Route path="/" element={<MyHome />} />
          {!isAuthenticated && (
            <Route path="/register" element={<MyRegister />} />
          )}
          <Route path="/film/:id" element={<MyFilmSingle />} />
          <Route path="/checkout" element={<MyCheck />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/tickets/:id_invoice" element={<MySingleTicket />} />
        </Routes>
        {!(
          location.pathname.includes("/film/") ||
          location.pathname.includes("/checkout")
        ) && (
          <Col
            className={`p-0 ps-xl-5 d-flex flex-column justify-content-between h-100 overflow-card mb-5 ${
              location.pathname.includes("/news")
                ? "col-12 col-xl-10"
                : "col-12 col-xl-4"
            }`}
          >
            <MyNews />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default App;
