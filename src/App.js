import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-multi-carousel/lib/styles.css";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import MyHome from "./components/MyHome";
import MyRegister from "./components/MyRegister";
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
import AdminPanel from "./components/AdminPanel";
import ProfiloUtente from "./components/ProfiloUtente";
import NotFoundPage from "./components/NotFoundPage";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        dispatch(meLogin());
      }
      await Promise.all([
        dispatch(filmsArray()),
        dispatch(filmsWhitoutProiezioni()),
        dispatch(newsCinema()),
        dispatch(getPreferiti()),
        dispatch(getInvoices()),
      ]);

      setLoading(false);
    };

    initializeData();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setIsAuthenticated(false);
  };

  const location = useLocation();

  return (
    <>
      <Container fluid className="container-fluid p-0 p-xl-4 bg-black m-0">
        <Row className="bg-dark h-100 p-0 p-4 rounded-4 m-0 overflow-hidden">
          <Col className="col-xl-2 col-12 d-xl-flex p-0 pe-xl-5 flex-column justify-content-between fixed-bottomNav bg-dark">
            <MyNav
              isAuthenticated={isAuthenticated}
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
            <Route
              path="/me/:id_utente"
              element={<ProfiloUtente onLogout={handleLogout} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {!(
            location.pathname.includes("/film/") ||
            location.pathname.includes("/checkout") ||
            location.pathname.includes("/administrator-panel")
          ) && (
            <Col
              className={`p-0 ps-xl-5 flex-column justify-content-between h-100 overflow-card mb-5 ${
                location.pathname.includes("/news")
                  ? "col-12 col-xl-10"
                  : "col-12 col-xl-4 d-none d-xl-flex"
              }`}
            >
              <MyNews />
            </Col>
          )}
        </Row>
      </Container>
      
    </>
  );
}

export default App;
