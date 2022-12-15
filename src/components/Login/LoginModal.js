import React from 'react'
import "./LoginModal.css"
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { AuthContext } from "../../context/auth.context";


const API_URL = "http://localhost:5005";

function LoginModal () {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  /* const navigate = useNavigate(); */

  const { storeToken, authenticateUser, isLoggedIn,logOutUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
    .then((response) => {
      console.log("JWT token", response.data.authToken);
      
      storeToken(response.data.authToken);
      authenticateUser();

      handleClose();
      // navigate("/");
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
  };
  return (
    <>
       
       { isLoggedIn ?
    <Button className="onlyButton" onClick={logOutUser}>
      Logout
    </Button> 
    :
     <Button className="onlyButton"  onClick={handleShow}>
      Login
    </Button>
    
    }

      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="LoginModalForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={handleEmail}
                type="email"
                placeholder="name@LoginModal.com"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
             <Form.Label>Password</Form.Label>
             <Form.Control onChange={handlePassword} type="password" placeholder="Password" />
           </Form.Group>          
          <Button type="submit" variant="secondary" >
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

export default LoginModal 


     

    {/* <Button variant="primary" onClick={handleShow}>
        Login
      </Button> */}