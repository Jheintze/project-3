import React from 'react'
import spacevid from "../../assets/Earth.mp4"
import "./home.css"
import surfer from "../../assets/saturnsurfer.jfif"

const Home = () => {
  return (
    <>
    <section className="home">    
        <video src={spacevid} autoPlay loop muted/>
    </section>
    <div className="text">
      <h1 className="homeTitle"> Explore the stars </h1>
      <h3> Take your holidays to the next level with us by visiting every planet of our 
      solar system. Surfing on the rings of Saturn or skiing on Uranus - you name it, we 
      have it.</h3>
    </div>
    
    </>
  )
}

export default Home