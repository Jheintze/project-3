// src/App.js

import Home from "./pages/home/home"
import { Routes, Route } from "react-router-dom";
import AddPlanet from "./components/AddPlanet.js";
import Navbar from "./components/Navbar/Navbar";
import Destinations from "./pages/destinations/destinations"
// import IsPrivate from "./components/IsPrivate";
// import IsAnon from "./components/IsAnon";


function App() {
  return <div className="App">
  
  <Navbar/>
  
    
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/planets" element={<AddPlanet />} />
  <Route path="/destinations/:planetId" element={<Destinations/>} />
 </Routes>
    
     
  </div>;
}
export default App;