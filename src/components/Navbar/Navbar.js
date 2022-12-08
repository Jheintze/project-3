import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const API_URL = "http://localhost:5005";

const Navbar = () => {

	const [planets, setPlanets] = useState([]);

  const getAllplanets = () => {
    // Get the token from the localStorage
    // const storedToken = localStorage.getItem("authToken");
    
    // Send the token through the request "Authorization" Headers
    axios.get(`${API_URL}/api/planets`)
    .then((response) => setPlanets(response.data))
    .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllplanets();
  }, [] );

  return (
	<nav class="navbar navbar-expand-lg  bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
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
</nav>
  )
}

export default Navbar


 // <li><Link to={"/planets/"}></Link></li>
    //        <li><a class="dropdown-item" href="#">Venus</a></li>
     //       <li><a class="dropdown-item" href="#">Ssaturn</a></li>