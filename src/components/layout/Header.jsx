import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../pages/profile/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../helpers/axiosHelper";
import { PiShoppingCartFill } from "react-icons/pi";
export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const { category } = useSelector((state) => state.userInfo);

  const { showCart } = useSelector((state) => state.systemInfo);

  const { counter } = useSelector((state) => state.systemInfo);

  //   useEffect(() => {}, [counter]);

  const handleOnLogout = () => {
    // log out from server by removing the access and refresh JWTs

    logoutUser(user._id);

    //clear storages
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");

    // reset store
    dispatch(setUser({}));
    navigate("/");
  };
  return (
    <div>
      <Navbar expand="md" variant="dark" className="bg-dark">
        <Container>
          <Link to="/dashboard" className="navbar-brand">
            E-Store
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {" "}
              {/* {category.map((item, i) => (
            <Nav.Link href="" key={item._id}>
                {item.title}
            </Nav.Link>
            ))} */}
              {/* <Link to="/signin" className="nav-link">
                Sign In
            </Link> */}
              <Link to="#!" className="nav-link" onClick={handleOnLogout}>
                Sign Out
              </Link>
              <Link to="/profile" className="nav-link">
                <div className="profile">KT</div>
              </Link>
              <Link to="/cart">
                <div className="cart text-end">
                  <span style={{ fontSize: "33px" }}>{counter}</span>
                  <PiShoppingCartFill />
                </div>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
