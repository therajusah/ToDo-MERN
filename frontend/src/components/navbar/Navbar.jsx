import { LuBook } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
const logout = () => {
  sessionStorage.clear("id");
  dispatch(authActions.login());
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg my-2">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <b>
              <LuBook />
              &nbsp; ToDo
            </b>
          </Link>
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/todo"
                >
                  ToDo
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="#"
                      onClick={logout}
                    >
                      Log Out
                    </Link>
                 
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/signin"
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
