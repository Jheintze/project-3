import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddPlanet(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [weather, setWeather] = useState("");
  const [distanceSun, setDistanceSun] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, type, weather, distanceSun, day, year , price, img };

    // Get token from localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send token through request "Authorization" Headers
    axios
    .post(`${API_URL}/api/planets`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      setName("");
      setType("");
     
    })
    .catch((error) => console.log(error));
  };

  return (
    <div className="AddPlanet">
      <h3>Add Planet</h3>

      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>

        <label>type</label>
        <textarea type="text" name="type" value={type} onChange={(e) => setType(e.target.value)}/>

        <label>weather</label>
        <textarea type="text" name="weather" value={weather} onChange={(e) => setWeather(e.target.value)}/>

        <label>distanceSun</label>
        <textarea type="text" name="distanceSun" value={distanceSun} onChange={(e) => setDistanceSun(e.target.value)}/>

        <label>day</label>
        <textarea type="text" name="day" value={day} onChange={(e) => setDay(e.target.value)}/>

        <label>Year</label>
        <textarea type="text" name="year" value={year} onChange={(e) => setYear(e.target.value)}/>

        <label>price</label>
        <textarea type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/>

        <label>img</label>
        <textarea type="text" name="img" value={img} onChange={(e) => setImg(e.target.value)}/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPlanet;