import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./BookingModal.css";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import SignUpModal from "../SignUp/SignUpModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = process.env.REACT_APP_API_URL

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
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!planet) {
      return;
    }
    const calculate = () => {
      let price = planet.price * adults;

      if (departure && returning) {

        let date1 = departure;
        let date2 = returning;
        new Date(date1).getTime();
        new Date(date2).getTime();
        let timeDif = new Date(date2).getTime() - new Date(date1).getTime();
        let days = timeDif / (1000 * 3600 * 24);

        price = price * days;
      }

      if ( TravelClass === "Business class"){
        price = price * 2
      }
      else if ( TravelClass === "First class"){
        price = price * 3
      }
      
      setPrice(price);
    };

    calculate();
  }, [departure, planet, returning, adults, TravelClass]);

  // handle Input fields
  
  const handleDeparture = (e) => {
    setDeparture(e.target.value);
  };
  const handleReturning = (e) => {
    setReturning(e.target.value);
  };
  const handleAdults = (e) => {
    setAdults(e.target.value);
  };
  const handleChildren = (e) => {
    setChildren(e.target.value);
  };
  const handleTravelClass = (e) => {
    setTravelClass(e.target.value);
    console.log(e.target.value);
  };
  

  let dateNoTime = new Date(departure).toLocaleDateString();

  const { storeToken, authenticateUser, isLoggedIn, user } =
    useContext(AuthContext);

  const handleBooking = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      departure,
      returning,
      adults,
      children,
      TravelClass,
      price,
      user: user._id,
      planet: planet._id,
    };

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
          {isLoggedIn ? (
            <Button
              className="onlyButtonThree"
              variant="light"
              onClick={handleShow}
              size="lg"
            >
              Book now !
            </Button>
          ) : (
            <Button
              className="onlyButtonThree"
              variant="light"
              onClick={props.handleShow}
              size="lg"
            >
              Register or Log in to book a flight to {planet.name}
            </Button>
          )}

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
                        value={departure}
                        onChange={handleDeparture}
                        required
                        min='2022-12-16'
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
                        min='2022-12-17'
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

{
  /* <input
                        class="form-control"
                        type="date"
                        value={returning}
                        onChange={handleReturning}
                        required
                      /> */
}
