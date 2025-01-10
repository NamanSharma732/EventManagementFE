import React from "react";
import { Form, Button } from "react-bootstrap";

const Security = ({ dataadd, submitData, disable }) => {
  return (
    <>
      <h5 className="mb-3">Security</h5>
      <div className="row">
        <Form.Group className="col-md-6 form-group">
          <Form.Label htmlFor="uname">User Name:</Form.Label>
          <Form.Control type="text" id="uname" placeholder="User Name" />
        </Form.Group>
        <Form.Group className="col-md-6 form-group">
          <Form.Label htmlFor="pass">Password:</Form.Label>
          <Form.Control type="password" id="pass" placeholder="Password" />
        </Form.Group>
      </div>

      <Button type="button" variant="btn btn-primary" onClick={submitData} disabled={disable}>
        {dataadd}
      </Button>
    </>
  );
};

export default Security;
