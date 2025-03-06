import React, {useEffect, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux"; //to handle state from the store
import { authActions } from "../../Store";  //to handle actions from the slice
import { useDispatch } from "react-redux";  //to call the action

function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch =useDispatch();

  const logout =()=>{
    console.log("logout called");
    sessionStorage.removeItem("id")
    dispatch(authActions.logout()); 
  }

  //dark mode extra bonus ke liye
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);


  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? "navbar-dark" : "navbar-light"}`}>
      <div className="container">
        <Link className="navbar-brand" to="#">
          <b>
            <img
              src="/vite.svg"
              alt="Vite Icon"
              className={"vite-icon"}
            />
            Task-Manager
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
          <li className="nav-item mx-2">
              <button className="dark-mode-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active  btn-nav" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active  btn-nav" aria-current="page" to="/tasks">
                Tasks
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link active btn-nav"
                    aria-current="page"
                    to="/signUp"
                  >
                    SignUp
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link active btn-nav"
                    aria-current="page"
                    to="/signIn"
                  >
                    SignIn
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li 
              className="nav-item mx-2"
              onClick={logout}
              >
                <Link
                  className="nav-link active btn-nav"
                  aria-current="page"
                  to="/"
                >
                  LogOut
                </Link>
              </li>
            )}
            <li className="nav-item mx-0">
              <Link className="nav-link active " aria-current="page" to="/signIn">
                <img
                  className="img-fluid user-png "
                  src="user.png"
                  alt="image"
                />
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
