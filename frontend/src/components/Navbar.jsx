import User from "../assets/user.png";
import { LuBook } from "react-icons/lu";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg my-2">
        <div className="container">
          <a className="navbar-brand" href="#">
            <b>
              <LuBook />
              &nbsp; ToDo
            </b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link active " aria-current="page" href="#">
                  About US
                </a>
              </li>
              <li className="nav-item mx-1">
                <a
                  className="nav-link active btn-nav"
                  aria-current="page"
                  href="#"
                >
                  SignUp
                </a>
              </li>
              <li className="nav-item mx-1">
                <a
                  className="nav-link active btn-nav"
                  aria-current="page"
                  href="#"
                >
                  SignIn
                </a>
              </li>
              <li className="nav-item mx-1">
                <a
                  className="nav-link active btn-nav"
                  aria-current="page"
                  href="#"
                >
                  Log Out
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <img
                    className="img-fluid user-png"
                    src={User}
                    alt="user-png"
                  ></img>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
