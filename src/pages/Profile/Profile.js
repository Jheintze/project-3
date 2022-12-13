import React from 'react'
import "./profile.css"
import BookingModal from '../../components/Booking/BookingModal'
import FlightCard from '../../components/FlightCard/FlightCard'

const Profile = () => {
  return (
    <>
    <section>
    <h1> Your booked flights </h1>
    </section>
    <section>
   
    <div class="row justify-content-evenly "> <FlightCard/> <FlightCard/> <FlightCard/></div>
    </section>
     </>
    
  )
}

export default Profile