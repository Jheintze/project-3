import React from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./destinations.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import BookingModal from "../../components/Booking/BookingModal";

// import Navbar from "./components/Navbar/Navbar";

const API_URL = process.env.REACT_APP_API_URL

const Destinations = (props) => {
  const [planet, setPlanet] = useState(null);
  const { planetId } = useParams();

  const getPlanet = () => {
    axios
      .get(`${API_URL}/api/planets/${planetId}`)
      .then((response) => {
        const oneplanet = response.data;
        setPlanet(oneplanet);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPlanet();
  }, [planetId]);

  return (
    <>
      {planet && (
        <div class="Full_width">
          <div class="set">
            <img src={planet.img} alt="alt"></img>
          </div>
          <div class="secondSet">
            <div className="wrapper">
              <h1 className="title"> {planet.name} </h1>
              <p class="planetText">
              {planet.description}
              </p>
              <ul class="planetFacts">
                <li class="listFacts"> Type: {planet.type} </li>
                <li class="listFacts">  Weather: {planet.weather}</li>
                <li class="listFacts"> Baseprice: {planet.price} €</li>
                <li class="listFacts"> Day : {planet.day}</li>
                <li class="listFacts"> Year : {planet.year}</li>
                
              </ul>
            </div>
            <BookingModal handleShow={props.handleShow} />
          </div>
        </div>
      )}
    </>
  );
};

export default Destinations;

