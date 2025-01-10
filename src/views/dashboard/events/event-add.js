import React, { memo, Fragment, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Card from "../../../components/Card/card";
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import { createEvent } from "../../../Redux/commonApi";
import { useNavigate } from "react-router-dom";

const EventAdd = memo(() => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
     name:"",
     description:"",
     location:"",
     date:""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name:"",
    description:"",
    location:"",
    date:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleActiveChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      active: e.target.value === "true", 
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: formData.name ? "" : "Event name is required",
      description: formData.description ? "" : "Description is required",
      location: formData.location ? "" : "location is required",
      date: formData.date ? "" : "Date is required",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createEvent(formData);
        toast.success("User created successfully!");
        navigate("/events");
        setLoading(false);
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <Row>
        <Col xl="12" lg="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">New Event Information</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="new-user-info">
                <Form>
                  <div className="row">
                    <Form.Group className="col-md-6 form-group">
                      <Form.Label htmlFor="name">Event Name:</Form.Label>
                      <Form.Control
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Event Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <span className="text-danger">{errors.name}</span>
                      )}
                    </Form.Group>
                    <Form.Group className="col-md-6 form-group">
                      <Form.Label htmlFor="description">Description</Form.Label>
                      <Form.Control
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                      {errors.description && (
                        <span className="text-danger">{errors.description}</span>
                      )}
                    </Form.Group>
                    <Form.Group className="col-md-6 form-group">
                      <Form.Label htmlFor="location">location:</Form.Label>
                      <Form.Control
                        type="text"
                        id="location"
                        name="location"
                        placeholder="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </Form.Group>
                    <Form.Group className="col-md-6 form-group">
                      <Form.Label htmlFor="date">Date:</Form.Label>
                      <Form.Control
                        type="date"
                        id="date"
                        name="date"
                        placeholder="Event Date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                      {errors.date && (
                        <span className="text-danger">{errors.date}</span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={()=>{navigate("/events")}}>
                       Back
                    </Button>
                     <Button
                      type="button"
                      variant="primary"
                      className="ms-3"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                    {loading ? "Creating..." : "Submit"}
                  </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
});

EventAdd.displayName = "EventAdd";
export default EventAdd;
