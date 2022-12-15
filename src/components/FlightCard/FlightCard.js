import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const API_URL = "http://localhost:5005";

function FlightCard({flight, getUserFlights}) {

  const deleteFlight = (fligthId) => {
    axios
      .delete(`${API_URL}/api/delete/${fligthId}`)
      .then((response) => { 
        getUserFlights()
       console.log(response)
      })
      .catch((error) => console.log(error));
  };

var dat = new Date(flight.departure).toLocaleDateString();
var wat = new Date(flight.returning).toLocaleDateString();

  return (
    
    <Card className ="hello" style={{ width: '18rem', marginBottom: "50px" }}>
      <Card.Img variant="top" src={flight.planet.img} />
      <Card.Body>
        <Card.Title>{flight.planet.name}</Card.Title>
        <Card.Text>
          {dat} - {wat}
        </Card.Text>
        <Button onClick={()=>deleteFlight(flight._id)} variant="primary">Cancel Flight</Button>
      </Card.Body>
    </Card>
    
  );
}

export default FlightCard;