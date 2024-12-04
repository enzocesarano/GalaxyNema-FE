import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-multi-carousel/lib/styles.css";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import MyHome from "./components/MyHome";
import MyRegister from "./components/MyRegister";
import { Col, Container, Row } from "react-bootstrap";
import MyNav from "./components/MyNav";
import MyLogin from "./components/MyLogin";
import MyProfNav from "./components/MyProfNav";
import MyDaily from "./components/MyDaily";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filmsArray,
  filmsWhitoutProiezioni,
  getPreferiti,
  meLogin,
  newsCinema,
} from "./redux/actions";
import MyFilmSingle from "./components/MyFilmSingle";
import MyCheck from "./components/MyCheck";
import MyNews from "./components/MyNews";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      dispatch(meLogin());
    } else {
      setIsAuthenticated(false);
    }

    dispatch(filmsArray());
    dispatch(filmsWhitoutProiezioni());
    dispatch(newsCinema());
    dispatch(getPreferiti());
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
        </Routes>
        {!(
          location.pathname.includes("/film/") ||
          location.pathname.includes("/checkout")
        ) && (
          <Col className={`p-0 ps-xl-5 d-flex flex-column justify-content-between h-100 overflow-card mb-5 ${(location.pathname.includes("/news")) ? "col-12 col-xl-10" : "col-12 col-xl-4"
          }`}>
            <MyNews />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default App;

