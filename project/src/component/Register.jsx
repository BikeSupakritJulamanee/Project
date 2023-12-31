import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Alert, Button } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext'; //useContext
import { db } from '../firebase'; //database
import { collection, addDoc } from 'firebase/firestore'; //firestore

function Register() {

  const [error, setError] = useState('');
  const { signUp } = useUserAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !username || !phone_number) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const userDocRef = await addDoc(collection(db, 'User'), {
        email,
        username,
        phone_number,
        password,
      });

      console.log('Document written with ID:', userDocRef.id);

      await signUp(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className="mb-3">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                SignUp
              </Button>
            </div>
          </Form>

          <div className="p-4 box mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;