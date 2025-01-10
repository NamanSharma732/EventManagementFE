import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSessionExpired } from '../Redux/auth/authSlice';
import { Modal, Button, Alert } from 'react-bootstrap';

const SessionExpiredAlert = () => {
  const dispatch = useDispatch();
  const sessionExpired = useSelector((state) => state.auth.sessionExpired);

  if (!sessionExpired) return null;

  const handleAlertClick = () => {
    dispatch(setSessionExpired(false));
    window.location.href = '/';
  };

  return (
    <Modal show={sessionExpired} onHide={handleAlertClick} centered>
      <Modal.Header closeButton>
        <Modal.Title>Session Timed Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">
          Your session has expired. Please log in again.
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleAlertClick}>
          Go to Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionExpiredAlert;