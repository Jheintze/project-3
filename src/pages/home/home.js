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
    
    </>
  )
}

export default Home