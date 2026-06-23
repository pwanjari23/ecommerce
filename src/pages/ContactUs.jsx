import React, { useRef, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';

const FIREBASE_DB_URL = 'https://ecommerce-movies-default-rtdb.firebaseio.com';

const ContactUs = () => {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const enteredName = nameRef.current.value.trim();
    const enteredEmail = emailRef.current.value.trim();
    const enteredPhone = phoneRef.current.value.trim();

    if (!enteredName || !enteredEmail || !enteredPhone) {
      setIsLoading(false);
      return;
    }

    const contactData = {
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(`${FIREBASE_DB_URL}/contact.json`, {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact details. Please try again.');
      }

      setSuccess(true);
      nameRef.current.value = '';
      emailRef.current.value = '';
      phoneRef.current.value = '';
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main-content py-5">
      <Container>
        <div className="section-title-container mb-5">
          <h2 className="section-title">CONTACT US</h2>
          <div className="section-title-line"></div>
        </div>

        <div className="contact-card">
          {success && (
            <Alert variant="success" className="mb-4">
              Thank you! Your message has been submitted successfully.
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={submitHandler} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                required
                placeholder="Enter your email address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                ref={phoneRef}
                required
                placeholder="Enter your phone number"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="contact-btn" disabled={isLoading}>
                {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default ContactUs;
