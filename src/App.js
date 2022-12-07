// src/App.js

import Home from "./pages/home/home"
import { Routes, Route } from "react-router-dom";
// import AddProject from "./components/AddProject";

// import IsPrivate from "./components/IsPrivate";
// import IsAnon from "./components/IsAnon";

function App() {
  return <div className="App">
    
    <h2>
  <Routes>
  <Route path="/" element={<Home />} />
  

  </Routes>
    
     </h2>
  </div>;
}
export default App;