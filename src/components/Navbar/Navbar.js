import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import SignUpModal from "../SignUp/SignUpModal";
import LoginModal from "../Login/LoginModal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/logo-no-background.png"

const API_URL = process.env.REACT_APP_API_URL

const MyNav = (props) => {
  const [planets, setPlanets] = useState([]);
  // const [showLogin, setShowLogin] = useState(false)

  const getAllplanets = () => {
    // Get the token from the localStorage
    // const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/planets`)
      .then((response) => setPlanets(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllplanets();
  }, []);

  return (
    <Navbar className="upperNav" collapseOnSelect expand="lg" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="navJustify">
        <Navbar.Brand href="/" className="logo">
           <img className="logoPic" src={logo}   alt="logo>"></img>
          </Navbar.Brand>
          <Nav className="">
            <NavDropdown className="dropDownTitle" title="Destinations" id="collasible-nav-dropdown">
              {planets.map((planet) => (
                <NavDropdown.Item style={{backgroundColor: "transparent"}}>
                <Link style ={{textDecoration: "none", Color: "black", backgroundColor: "black"}} to={`/destinations/` + planet._id}>{planet.name}</Link>               
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Nav>
            <SignUpModal show={props.show}/>
            <LoginModal />
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
/* <NavDropdown.Item as={Link} to={`/destinations/` + planet._id}>Hello</NavDropdown.Item> */
// <li><Link to={"/planets/"}></Link></li>
//        <li><a class="dropdown-item" href="#">Venus</a></li>
//       <li><a class="dropdown-item" href="#">Ssaturn</a></li>

/* { <nav class="navbar navbar-expand-lg  ">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
          
        <li class="nav-item">
        <SignUpModal />
        </li>
        <li class="nav-item">
        <LoginModal />
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Destinations
          </a>
          <ul class="dropdown-menu">
		  {planets.map( (planet) => (
			<Link to={`/destinations/` + planet._id}>{planet.name}</Link>
					))}
          </ul>
        </li>
      </ul>
    </div>
  </div>

</nav> }*/
