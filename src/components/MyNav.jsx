import React from "react";
import { Image, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import MyProfNav from "./MyProfNav";
import MyLogin from "./MyLogin";
import { useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const MyNav = ({ isAuthenticated, onLoginSuccess, onLogout }) => {
  const logged = useSelector((store) => store.loginMe.loginMe);
  const location = useLocation();

  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.sub;
    } catch (error) {
      console.error("Errore nel decodificare il token:", error);
    }
  }

  const [showLogin, setShowLogin] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      expand="xl"
      className="d-flex flex-row flex-xl-column p-0 mb-xl-3 text-center text-xl-start "
    >
      <div className="w-100 mb-5 d-none d-xl-block">
        <img
          src="/logo.svg"
          alt="Galaxynema Logo"
          className="img-fluid w-75 "
        />
      </div>
      <div className="d-flex flex-row flex-xl-column justify-content-evenly p-3 p-xl-0 justify-content-xl-start w-100">
        <Link
          to="/"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/") ? "active" : "text-secondary"
          }`}
        >
          <i className="bi bi-house-fill m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">Home</span>
        </Link>
        <Link
          to="/movies"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/movies") ? "active" : "text-secondary"
          }`}
        >
          <i className="bi bi-film m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">Movies</span>
        </Link>
        <Link
          to="/favorites"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/favorites") ? "active" : "text-secondary"
          }`}
        >
          <i className="bi bi-star-fill m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">Preferiti</span>
        </Link>
        <Link
          to="/tickets"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/tickets") ? "active" : "text-secondary"
          }`}
        >
          <i className="bi bi-ticket-perforated-fill m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">Ticket</span>
        </Link>
        <Link
          to="/news"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/news") ? "active" : "text-secondary"
          }`}
        >
          <i className="bi bi-newspaper m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">News</span>
        </Link>
        {logged.role === "ADMIN" && isAuthenticated && (
          <Link
            to="/administrator-panel"
            className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
              isActive("/administrator-panel") ? "active" : "text-secondary"
            }`}
          >
            <i className="bi bi-person-vcard-fill m-0 me-xl-2"></i>
            <span className="d-none d-xl-inline">Pannello Admin</span>
          </Link>
        )}
        {!isAuthenticated ? (
          <Link
            className="loginbutton p-2 rounded-4 active px-3 d-xl-none"
            onClick={() => setShowLogin(!showLogin)}
          >
            <i className="bi bi-box-arrow-in-right "></i>
          </Link>
        ) : (
          <Link to={`/me/${userId}`} className="p-1 rounded-4 px-3 d-xl-none">
            <div className="w-10">
              <Image
                src={logged.avatar}
                alt="Profile"
                className="imageProfile w-100 h-100 object-fit-cover rounded-circle"
              />
            </div>
          </Link>
        )}
      </div>

      <div
        className={` m-auto m-xl-0 mt-4 mt-xl-4 ${
          showLogin || "d-none d-xl-block "
        }`}
      >
        {isAuthenticated ? (
          <MyProfNav onLogout={onLogout} />
        ) : (
          <MyLogin onLoginSuccess={onLoginSuccess} />
        )}
      </div>
    </Navbar>
  );
};

export default MyNav;
