import React from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./destinations.css";
import BookingModal from "../../components/Booking/BookingModal";

// import Navbar from "./components/Navbar/Navbar";
const API_URL = "http://localhost:5005";

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
          <ul>
            <li className="plName">{planet.name}</li>
            <li> {planet.type}</li>
            <li> {planet.weather}</li>
            <li> {planet.distanceSun}</li>
            </ul>
            <BookingModal handleShow={props.handleShow}/> 
          </div>
        </div>
      )}
    </>
  );
};

export default Destinations;

/* {planet && (
        <>
           
          <h1>{planet.name}</h1>
         <img src={planet.img} alt="alt"></img>
        </>
      )} */
