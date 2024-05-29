import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userAuthorSlice";

function Header() {
  let { loginUserStatus, currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );
  let dispatch = useDispatch();
  function signout() {
    dispatch(resetState());
  }

  return (
    <div className="navbar">
      <img
        src="https://img.freepik.com/premium-vector/word-concept-color-geometric-shapes-blog_205544-13021.jpg"
        width="80px"
        height="60px"
        alt=""
      />
      <h3 className="heading">Blog App</h3>

      <ul className="List">
        {loginUserStatus === false ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/home" >
              <button className="btn nav button">Home</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                <button className="btn nav button">Sign up</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin">
                <button className="btn nav button">Login</button>
              </NavLink>
            </li>
          </>
        ) : (
          currentUser.username && (
            <>
              <li>
                <div
                  className="lead fs-4 fw-1"
                  style={{
                    color: "#A1DD70",
                    
                    fontSize: "1.2rem",
                    textTransform: "capitalize",
                    fontFamily: "fantasy",
                  }}
                >
                  {currentUser.username}
                  <sup
                    style={{
                      color:"#F6EEC9",
                      fontSize: "1rem",
                    }}
                  >
                    ({currentUser.userType})
                  </sup>
                </div>
              </li>
              <li>
                <NavLink to="/signin" onClick={signout}>
                  <button className="btn button">Sign out</button>
                </NavLink>
              </li>
            </>
          )
        )}
      </ul>
    </div>
  );
}

export default Header;
