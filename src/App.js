import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-multi-carousel/lib/styles.css";
import "./App.css";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MyHome from "./components/MyHome";
import MyRegister from "./components/MyRegister";
import { Col, Container, Row } from "react-bootstrap";
import MyNav from "./components/MyNav";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filmsArray,
  filmsWhitoutProiezioni,
  getInvoices,
  getPreferiti,
  getSale,
  meLogin,
  newsCinema,
} from "./redux/actions";
import MyFilmSingle from "./components/MyFilmSingle";
import MyCheck from "./components/MyCheck";
import MyNews from "./components/MyNews";
import MySingleTicket from "./components/MySingleTicket";
import MyTickets from "./components/MyTickets";
import { jwtDecode } from "jwt-decode";
import AdminPanel from "./components/AdminPanel";
import ProfiloUtente from "./components/ProfiloUtente";
import LoadingPage from "./components/LoadingPage";
import NotFoundPage from "./components/NotFoundPage";
import AboutUs from "./components/AboutUs";
import MyFavorite from "./components/MyFavorite";

function App() {
  const navigate = useNavigate();
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
      dispatch(getPreferiti());
      dispatch(getInvoices());
    } else {
      setIsAuthenticated(false);
    }

    dispatch(filmsArray());
    dispatch(filmsWhitoutProiezioni());
    dispatch(newsCinema());
    dispatch(getSale());
    
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
    setIsAuthenticated(false);
  };

  const films = useSelector((state) => state.proiezioni.proiezioni);
  const preferiti = useSelector((state) => state.preferiti.preferiti);
  const isLoading = !films.content || films.content.length === 0;

  return isLoading ? (
    <Container fluid className="container-fluid p-0 p-xl-4 bg-black m-0">
      <Row className="bg-dark h-100 p-0 p-4 rounded-4 m-0 overflow-hidden">
        <LoadingPage />
      </Row>
    </Container>
  ) : (
    <Container fluid className="container-fluid p-0 p-xl-4 bg-black bg-small m-0">
      <Row className="bg-dark h-100 p-0 p-4 rounded-4 roundedSmall m-0 overflow-hidden">
        <Col className="col-xl-2 col-12 d-xl-flex p-0 pe-xl-5 flex-column justify-content-between fixed-bottomNav h100-1200 bg-dark">
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
          <Route path="/administrator-panel" element={<AdminPanel />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/news" element={<MyNews />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/favorites" element={<MyFavorite films={preferiti}/>} />
          <Route
            path="/me/:id_utente"
            element={
              <ProfiloUtente
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            }
          />
        </Routes>

        <MyNews />
      </Row>
    </Container>
  );
}

export default App;
