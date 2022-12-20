import React from 'react'
import surf from "../../assets/surf.jpg"
import surf2 from "../../assets/uranus.jfif"
const Highlights = () => {
  return (
    <>
    <section className="highlighPic">   
    <h1 class="highlightText"> Surfing on Saturn rings</h1> 
    <img src={surf} alt="surf"></img>
    </section>
    <div className="text">
    
    <img  class="picTwo" src={surf2} alt="surf2"></img>
    </div>
    
    </>
  )
}

export default Highlights



