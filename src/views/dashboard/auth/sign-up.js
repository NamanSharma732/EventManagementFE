import React, { memo, Fragment, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../../components/Card/card";
import auth5 from "../../../assets/images/auth/05.png";
import * as SettingSelector from "../../../Redux/setting/selectors";
import { useSelector } from "react-redux";
import { createUser } from "../../../Redux/commonApi";

const SignUp = memo(() => {
  const appName = useSelector(SettingSelector.app_name);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormData({ ...formData, errors });
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      errors: { ...formData.errors, [name]: "" },
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      try {
        await createUser(payload);
        setLoading(false);
        navigate("/"); // Navigate to sign in page after successful signup
      } catch (error) {
        setLoading(false);
        console.error("Signup failed:", error);
        setFormData({
          ...formData,
          errors: {
            ...formData.errors,
            general: "Signup failed. Please try again.",
          },
        });
      }
    }
  };

  return (
    <Fragment>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
            <Image
              src={auth5}
              className="Image-fluid gradient-main animated-scaleX"
              alt="images"
            />
          </div>
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                  <Card.Body>
                    <h2 className="mb-2 text-center">Sign Up</h2>
                    <p className="text-center">Create your account.</p>
                    <Form onSubmit={handleSignUp}>
                      <Row>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="username">Username*</Form.Label>
                            <Form.Control
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              isInvalid={!!formData.errors.username}
                              placeholder="Enter Username"
                            />
                            <Form.Control.Feedback type="invalid">
                              {formData.errors.username}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email">Email*</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              isInvalid={!!formData.errors.email}
                              placeholder="Enter Email"
                            />
                            <Form.Control.Feedback type="invalid">
                              {formData.errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="password">Password*</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              isInvalid={!!formData.errors.password}
                              placeholder="Enter Password"
                            />
                            <Form.Control.Feedback type="invalid">
                              {formData.errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="confirmPassword">
                              Confirm Password*
                            </Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              isInvalid={!!formData.errors.confirmPassword}
                              placeholder="Confirm Password"
                            />
                            <Form.Control.Feedback type="invalid">
                              {formData.errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      {formData.errors.general && (
                        <p className="text-danger text-center">
                          {formData.errors.general}
                        </p>
                      )}
                      <div className="d-flex justify-content-center">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={loading}
                        >
                          {loading ? "Signing Up..." : "Sign Up"}
                        </Button>
                      </div>
                      <p className="mt-3 text-center">
                        Already have an Account{" "}
                        <Link to="/" className="text-underline">
                          Sign In
                        </Link>
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
});

SignUp.displayName = "SignUp";
export default SignUp;