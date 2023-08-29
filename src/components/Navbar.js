import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Model";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);

  let data = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Food Corner
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              {/* <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="#"
                >
                  Home
                </Link>
              </li> */}

              {/* Logic for Login and Logout */}

              {/* {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="#"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )} */}
            </ul>

            {/* Logic for Login and Logout */}
            {/* We are using authToken to keep tract if the user is logged in or not  */}

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success mx-1 fw-medium"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn bg-white text-success mx-1 fw-medium"
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <button
                  className="btn bg-white text-success mx-2 fw-medium position-relative"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {data.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </button>

                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}

                <div
                  className="btn bg-white text-danger mx-2 fw-medium"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
