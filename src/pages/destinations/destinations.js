import React from 'react'
import { Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

// import Navbar from "./components/Navbar/Navbar";
const API_URL = "http://localhost:5005";
 


const Destinations = () => {
    const [planet, setPlanet] = useState(null);
    const { planetId } = useParams();
    
    const getPlanet = () => {
        
        axios.get(`${API_URL}/api/planet/${planetId}`)
        .then((response) => {
          const oneplanet= response.data;
          setPlanet(oneplanet);
        
        })
        .catch((error) => console.log(error));
      };
      
      useEffect(()=> {
        getPlanet();
      }, [] );

   return (
    
    <div>destinations
     {planet && (
        <>
          <h1>{planet.name}</h1>
          <p>{planet.type}</p>
        </>
      )}
    
    </div>
  )
}

export default Destinations