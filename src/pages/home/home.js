import React from 'react'
import spacevid from "../../assets/Earth.mp4"

const Home = () => {
  return (
    <div className="home">
        <video src={spacevid} autoPlay loop muted/>
    </div>
  )
}

export default Home