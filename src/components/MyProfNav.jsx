import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const MyProfNav = ({ onLogout }) => {
  const logged = useSelector((store) => store.loginMe.loginMe);

  return (
    <div className="d-none d-xl-flex fs-5 align-items-center ">
      <div className="w-10 me-3">
        <Image
          src={logged.avatar}
          alt="Profile"
          className="imageProfile w-100 h-100 object-fit-cover rounded-circle"
        />
      </div>

      <p className="text-secondary p-0 m-0 me-3">{logged.nome}</p>
      <i className="bi bi-bell-fill text-secondary me-3"></i>

      <i
        className="bi bi-box-arrow-right text-danger cursor-pointer"
        onClick={onLogout} 
      ></i>
    </div>
  );
};

export default MyProfNav;