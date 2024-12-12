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
  const defaultAvatar =
    "https://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898.png";
  const avatar = logged?.avatar || defaultAvatar;
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
      className="d-flex flex-row flex-xl-column h-100 p-0 mb-xl-3 text-center text-xl-start "
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
        <Link
          to="/about-us"
          className={`nav-link fw-bold p-2 px-3 rounded-4 w-auto ${
            isActive("/about-us") ? "active" : "text-secondary"
          }`}
        >
          <i className="bi bi-info-circle-fill m-0 me-xl-2"></i>
          <span className="d-none d-xl-inline">About Us</span>
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
          <Link
            to={`/me/${userId || ""}`}
            className="p-1 rounded-4 px-3 d-xl-none"
          >
            <div className="w-10">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Profile"
                  className="imageProfile w-100 h-100 object-fit-cover rounded-circle"
                />
              ) : (
                <i
                  className="bi bi-person-circle text-secondary"
                  style={{ fontSize: "2rem" }}
                ></i>
              )}
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

      <div className="p-4 h-100 d-xl-flex flex-column justify-content-end d-none">
        <div className="d-flex fs-4 justify-content-between mb-2">
          <Link
            to="https://www.instagram.com/enzo.cesaranoo/"
            target="_blank"
            className="nav-link-social fw-bold p-1 px-2 rounded-4 w-auto 
              text-secondary"
          >
            <i className="bi bi-instagram m-0"></i>
          </Link>
          <Link
            to="https://it-it.facebook.com/vinc.cesarano"
            target="_blank"
            className="nav-link-social fw-bold p-1 px-2 rounded-4 w-auto 
              text-secondary"
          >
            <i className="bi bi-facebook m-0"></i>
          </Link>
          <Link
            to="https://x.com/CesaranoVinc"
            target="_blank"
            className="nav-link-social fw-bold p-1 px-2 rounded-4 w-auto 
              text-secondary"
          >
            <i className="bi bi-twitter-x m-0"></i>
          </Link>
          <Link
            to="https://www.tiktok.com/@enzo.cesarano"
            target="_blank"
            className="nav-link-social fw-bold p-1 px-2 rounded-4 w-auto 
              text-secondary"
          >
            <i className="bi bi-tiktok m-0"></i>
          </Link>
          <Link
            to="https://wa.me/+393470757363"
            target="_blank"
            className="nav-link-social fw-bold p-1 px-2 rounded-4 w-auto 
              text-secondary"
          >
            <i className="bi bi-whatsapp m-0"></i>
          </Link>
        </div>
        <p className="text-secondary text-center m-0">
          &copy; {new Date().getFullYear()} GALAXYNEMA.
        </p>
        <p className="text-secondary text-center">
          {" "}
          Tutti i diritti riservati.
        </p>
      </div>
    </Navbar>
  );
};

export default MyNav;
