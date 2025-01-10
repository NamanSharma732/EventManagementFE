import React, { memo, Fragment, useState } from "react";
import { Row, Col, Image, Form, Button, ListGroup } from "react-bootstrap";
import {Link, useNavigate } from "react-router-dom";
import Card from "../../../components/Card/card";
import auth1 from "../../../assets/images/auth/01.png";
import * as SettingSelector from "../../../Redux/setting/selectors";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../Redux/auth/authApi";

const SignIn = memo(() => {
  const appName = useSelector(SettingSelector.app_name);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    errors: {},
  });

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } 

    setFormData({ ...formData, errors });
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      errors: { ...formData.errors, [name]: "" },
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      try {
        console.log(payload);
        await dispatch(loginUser(payload));
        setLoading(false);
        console.log("kya mai yaha hu");
        navigate("/events");
      } catch (error) {
        setLoading(false);
        console.error("Login failed:", error);
        setFormData({
          ...formData,
          errors: { ...formData.errors, general: "Login failed. Please try again." },
        });
      }
    }
  };

  return (
    <Fragment>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <Card.Body>
                  
                    <h2 className="mb-2 text-center">Sign In</h2>
                    <p className="text-center">Login to stay connected.</p>
                    <Form onSubmit={handleLogin}>
                      <Row>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Enter Email Address"
                              value={formData.email}
                              onChange={handleInputChange}
                              isInvalid={!!formData.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formData.errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg="12" className="">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                               placeholder="Enter Password"
                              value={formData.password}
                              onChange={handleInputChange}
                              isInvalid={!!formData.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formData.errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      {formData.errors.general && (
                        <p className="text-danger text-center">{formData.errors.general}</p>
                      )}
                      <p className="d-flex justify-content-center">Dont have an account ? {``} <Link to="/signup" className="text-primary" onClick={()=>{navigate("/signup")}}>{`Sign Up`}</Link></p>
                      <div className="d-flex justify-content-center">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={loading}
                        >
                          {loading ? "Signing In..." : "Sign In"}
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col
            md="6"
            className="d-md-block d-none bg-primary p-0 vh-100 overflow-hidden"
          >
            <Image
              src={auth1}
              className="image-fluid gradient-main animated-scaleX"
              alt="images"
            />
          </Col>
        </Row>
      </section>
    </Fragment>
  );
});

SignIn.displayName = "SignIn";
export default SignIn;