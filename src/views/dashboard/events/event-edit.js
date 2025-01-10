import React, { memo, Fragment, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../../components/Card/card";
import { updateEvent } from "../../../Redux/commonApi";

const EventEdit = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    id: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventName = params.get("name");
    const eventDescription = params.get("description");
    const eventDate = params.get("date");
    const eventLocation = params.get("location");
    const eventId = params.get("id");

    if (!eventId) {
      toast.error("No event data available");
      navigate("/events");
      return;
    }


    let formattedDate = "";
    if (eventDate) {
      const date = new Date(eventDate);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toISOString().split('T')[0];
      }
    }

    setFormData({
      name: eventName || "",
      description: eventDescription || "",
      date: formattedDate,
      location: eventLocation || "",
      id: eventId
    });
  }, [location.search, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: formData.name ? "" : "Event name is required",
      description: formData.description ? "" : "Description is required",
      location: formData.location ? "" : "Location is required",
      date: formData.date ? "" : "Date is required",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        if (!formData.id) {
          throw new Error("Event ID not available");
        }

        const submitData = {
          ...formData,
          date: new Date(formData.date).toISOString() 
        };
        
        await updateEvent(formData.id, submitData);
        toast.success("Event updated successfully!");
        navigate("/events");
      } catch (error) {
        console.error("Error updating event:", error);
        toast.error("Error updating event");
      } finally {
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
                <h4 className="card-title">Edit Event Information</h4>
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
                      {errors.name && <span className="text-danger">{errors.name}</span>}
                    </Form.Group>
                    <Form.Group className="col-md-6 form-group">
                      <Form.Label htmlFor="location">Location:</Form.Label>
                      <Form.Control
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Event Location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                      {errors.location && <span className="text-danger">{errors.location}</span>}
                    </Form.Group>
                    <Form.Group className="col-md-6 form-group">
                      <Form.Label htmlFor="date">Date:</Form.Label>
                      <Form.Control
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                      {errors.date && <span className="text-danger">{errors.date}</span>}
                    </Form.Group>
                    <Form.Group className="col-md-6 form-group">
                      <Form.Label htmlFor="description">Description:</Form.Label>
                      <Form.Control
                        as="textarea"
                        id="description"
                        name="description"
                        placeholder="Event Description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                      {errors.description && <span className="text-danger">{errors.description}</span>}
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => navigate("/events")}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      className="ms-3"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update"}
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

EventEdit.displayName = "EventEdit";
export default EventEdit;