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
const API_URL = "https://rich-plum-calf-slip.cyclic.app";

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
              <h1 class="title"> {planet.name} </h1>
              <p class="planetText">
              
                here some descriptionhere some descriptionhere some
                descriptionhere some descriptionhere some descriptionhere some
                descriptionhere some descriptionhere some descriptionhere some
                description
              </p>
              <ul class="planetFacts">
                <li>{planet.name}</li>
                <li> {planet.type}</li>
                <li> {planet.weather}</li>
                <li> {planet.distanceSun}</li>
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

/* {planet && (
        <>
           
          <h1>{planet.name}</h1>
         <img src={planet.img} alt="alt"></img>
        </>
      )} */
{
  /* <h1> {planet.name}</h1>
          <ul>
            <li className="plName">{planet.name}</li>
            <li> {planet.type}</li>
            <li> {planet.weather}</li>
            <li> {planet.distanceSun}</li>
            </ul>
            <BookingModal handleShow={props.handleShow}/>  */
}
{
  /* <div class="card" style={{ width: "18rem"}}>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div class="planetfacts">
              <p> something here</p>
              <p> something here</p>
              <p> something here</p>
              <p> something here</p>
              </div>
              <div class="card-body"></div> */
}
