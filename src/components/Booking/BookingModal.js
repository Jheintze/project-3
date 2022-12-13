import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Booking.css";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import SignUpModal from "../SignUp/SignUpModal";



const API_URL = "http://localhost:5005";

const BookingModal = (props) => {
  const [planet, setPlanet] = useState();
  const { planetId } = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [departure, setDeparture] = useState("");
  const [returning, setReturning] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState("");
  const [TravelClass, setTravelClass] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [price, setPrice] = useState(0)
  // const [planetPrice, setPlanetPrice] = useState(0)
 
  

  const handleDeparture = (e) => {
    setDeparture(e.target.value);
    calculate()
  }
  const handleReturning = (e) => setReturning(e.target.value);

  const handleAdults = (e) => {
    setAdults(e.target.value);
    calculate()
  }
  const handleChildren = (e) => setChildren(e.target.value);
  const handleTravelClass = (e) => setTravelClass(e.target.value);
  

  const calculate = () =>{
    console.log(planet.price)
    let price =  planet.price * adults
    setPrice(price)
  }
  
  console.log(price)

  const { storeToken, authenticateUser , isLoggedIn} = useContext(AuthContext);

  const handleBooking = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { departure, returning, adults, children, TravelClass };

    axios
      .post(`${API_URL}/api/flights`, requestBody)
      .then((response) => {
        handleClose();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  /* display planet name in the modal  */

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
        <>
        { isLoggedIn ?
    <Button className="onlyButtonTwo" variant="dark" onClick={handleShow} >
     Book now !  
    </Button> 
    :
     <Button className="onlyButtonThree" variant="dark" onClick={props.handleShow}>
      Register or Log in
    </Button>
    
    }     


          {/* <Button className="onlyButtonTwo" variant="dark" onClick={handleShow}>
            Book
          </Button> */}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Flight to {planet.name} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleBooking}>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <span class="form-label">Departing</span>
                      <input
                        class="form-control"
                        type="date"
                        min="2022-12-13"
                        value={departure}
                        onChange={handleDeparture}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <span class="form-label">Returning</span>
                      <input
                        class="form-control"
                        type="date"
                        value={returning}
                        onChange={handleReturning}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <span class="form-label">Adults (18+)</span>
                      <select
                        class="form-control"
                        value={adults}
                        onChange={handleAdults}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <span class="select-arrow"></span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <span class="form-label">Children (0-13)</span>
                      <select
                        class="form-control"
                        value={children}
                        onChange={handleChildren}
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                      </select>
                      <span class="select-arrow"></span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <span class="form-label">Travel class</span>
                      <select
                        class="form-control"
                        value={TravelClass}
                        onChange={handleTravelClass}
                      >
                        <option>Economy class</option>
                        <option>Business class</option>
                        <option>First class</option>
                      </select>
                      <span class="select-arrow"></span>
                    </div>
                  </div>
                </div>
                <div class="form-btn">
                  
                   <button type="submit" class="submit-btn">
                    Book flight for {price} €
                  </button> 
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              {errorMessage && <p> {errorMessage}</p>}
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default BookingModal;
