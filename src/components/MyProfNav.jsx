import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const MyProfNav = ({ onLogout }) => {
  const logged = useSelector((store) => store.loginMe.loginMe);
  const token = localStorage.getItem("token");

  const defaultName = "Benvenuto";

  let userId = "";
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.sub;
    } catch (error) {
      console.error("Errore nella decodifica del token:", error);
    }
  }

  const avatar = logged?.avatar;
  const nome = logged?.nome || defaultName;

  return (
    <div className="d-none d-xl-flex fs-5 align-items-center ">
      <div className="w-10 mb-2 me-3">
        <Link to={`/me/${userId || ""}`}>
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
        </Link>
      </div>

      <p className="text-secondary p-0 m-0 me-3">Ciao, {nome}!</p>

      <i
        className="bi bi-box-arrow-right text-danger cursor-pointer"
        onClick={onLogout}
      ></i>
    </div>
  );
};

export default MyProfNav;
