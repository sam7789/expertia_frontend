import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../../redux/userData/action";
import { fetchJobs } from "../../../redux/jobData/action";

export const Navbar = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.isUserLoggedIn);
  const user = useSelector((state) => state.user.userData.user);

  function handleLogout() {
    dispatch(userLogoutAction());
  }

  function handleHome() {
    dispatch(fetchJobs("", 1));
  }
  return (
    <section className="navbar">
      <nav className="navbar__container">
        <Link to="/" className="links">
          <h1 className="site-logo" onClick={handleHome}>
            JOB PORTAL
          </h1>
        </Link>
        {userStatus ? (
          <div className="navbar__user">
            <p>Welcome {user.name}</p>
            <p id="waving-hand">👋</p>
          </div>
        ) : null}

        {userStatus ? (
          <span className="user_status" onClick={handleLogout}>
            Logout
          </span>
        ) : (
          <Link to="/login">
            <span className="user_status">Login</span>
          </Link>
        )}
      </nav>
    </section>
  );
};
