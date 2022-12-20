import React, { useState } from "react";
import "./profile.css";
import BookingModal from "../../components/Booking/BookingModal";
import FlightCard from "../../components/FlightCard/FlightCard";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";

const Profile = () => {
  
  const API_URL = process.env.REACT_APP_API_URL

  const { storeToken, authenticateUser, isLoggedIn, user } =

    useContext(AuthContext);
  const [UserFlights, setUserFlights] = useState();
  console.log(UserFlights);

  const getUserFlights = () => {
    axios
      .get(`${API_URL}/api/users/${user._id}/flights`)
      .then((response) => {
        setUserFlights(response.data);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (user == null) return;
    getUserFlights();
  }, [user]);

  return (
    <>
      <h1 className="welcome"> Welcome {user?.name} </h1>

      <div class="container text-center ">
        <div className="cards row justify-content-evenly ">
          {UserFlights &&
            UserFlights.map((flight) => (
              <FlightCard
                key={flight._id}
                flight={flight}
                getUserFlights={getUserFlights}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
