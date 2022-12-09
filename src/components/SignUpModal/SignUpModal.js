import React from 'react'
import "./SignUpModal.css"
import { useState , useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { AuthContext } from "./../../context/auth.context";

const API_URL = "http://localhost:5005";



function SignUpModal(props) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser , isLoggedIn} = useContext(AuthContext);

  // const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };
    const requestBodyLogin = { email, password };

    axios.post(`${API_URL}/auth/signup`, requestBody)
    .then((response) => {
      handleClose();

      axios.post(`${API_URL}/auth/login`, requestBodyLogin)
    .then((response) => {
      storeToken(response.data.authToken);
      authenticateUser();
      /* props.setShowLogin(true) */
      
      /* navigate("/login"); */
    })})
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
  };

  return (
    <>

{ isLoggedIn ?
    <Button variant="primary" >
      Profile
    </Button> 
    :
     <Button variant="secondary" onClick={handleShow}>
      Register
    </Button>
    
    }
      
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3" controlId="SignUpModalForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={handleEmail}
                type="email"
                placeholder="name@SignUpModal.com"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
             <Form.Label>Username</Form.Label>
             <Form.Control onChange={handleName} type="text" placeholder="Username" />
           </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
             <Form.Label>Password</Form.Label>
             <Form.Control type="password" onChange={handlePassword} placeholder="Password" />
           </Form.Group>
          <Button  type="submit" variant="secondary" >
           Submit
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>        
          {errorMessage && <p> {errorMessage}</p>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignUpModal


{/* <Button variant="primary" onClick={handleShow}>
        Register
      </Button> */}