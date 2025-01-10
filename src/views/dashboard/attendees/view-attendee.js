import React, { memo, Fragment, useState, useEffect, useCallback } from "react";
import {
  getEvents,
  deleteEvent,
  getAttendees,
  removeAttendee,
  getNonEventAttendees,
  addAttendeeToEvent,
} from "../../../Redux/commonApi";
import {
  Row,
  Col,
  Table,
  Form,
  Spinner,
  Pagination,
  Modal,
  Button,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "../../../components/Card/card";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./attendees.css";

// Separate Modal Components
const NewAttendeeModal = ({ show, onHide, events, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.eventId) {
      toast.error("Please fill in all fields");
      return;
    }
    await onSubmit(formData);
    setFormData({ name: "", email: "", eventId: "" }); // Reset form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Attendee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Event <span className="text-danger">*</span></Form.Label>
            <Form.Select
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              required
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Attendee
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const ExistingAttendeeModal = ({ show, onHide, events, onSubmit }) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [availableAttendees, setAvailableAttendees] = useState([]);

  const fetchAvailableAttendees = async (eventId) => {
    try {
      const response = await getNonEventAttendees({ eventId });
      setAvailableAttendees(response.data.data);
    } catch (error) {
      toast.error("Error fetching available attendees");
    }
  };

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId);
    setSelectedAttendee(null);
    if (eventId) fetchAvailableAttendees(eventId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent || !selectedAttendee) {
      toast.error("Please select both event and attendee");
      return;
    }
    await onSubmit({ eventId: selectedEvent, attendee: selectedAttendee });
    setSelectedEvent("");
    setSelectedAttendee(null);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Existing Nominee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Event <span className="text-danger">*</span></Form.Label>
            <Form.Select
              value={selectedEvent}
              onChange={(e) => handleEventChange(e.target.value)}
              required
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {selectedEvent && (
            <Form.Group className="mb-3">
              <Form.Label>Attendee <span className="text-danger">*</span></Form.Label>
              <Form.Select
                value={selectedAttendee?._id || ""}
                onChange={(e) => setSelectedAttendee(availableAttendees.find(a => a._id === e.target.value))}
                required
              >
                <option value="">Select Attendee</option>
                {availableAttendees.map((attendee) => (
                  <option key={attendee._id} value={attendee._id}>
                    {attendee.name} ({attendee.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add to Event
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};



// Custom hook for pagination
const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    indexOfLastItem
  };
};

const ViewEventsModal = ({ show, onHide, attendee }) => {
    return (
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Events for {attendee?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {attendee?.events?.length > 0 ? (
            <ul>
              {attendee.events.map(event => (
                <li key={event._id}>{event.name}</li>
              ))}
            </ul>
          ) : (
            <p>No events found for this attendee.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const DeleteAttendeeModal = ({ show, onHide, attendee, events, onDelete }) => {
    const [selectedEventIds, setSelectedEventIds] = useState([]);
  
    const handleCheckboxChange = (eventId) => {
      setSelectedEventIds((prev) => 
        prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
      );
    };
  
    const handleDelete = async () => {
      await onDelete(attendee._id, selectedEventIds);
      onHide(); 
    };
  
    return (
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Attendee from Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select events to remove {attendee.name} from:</p>
          {events.map(event => (
            <Form.Check
              key={event._id}
              type="checkbox"
              label={event.name}
              checked={selectedEventIds.includes(event._id)}
              onChange={() => handleCheckboxChange(event._id)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Remove Attendee
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
// Main Component
const AttendeeList = memo(() => {
  // State Management
  const [attendees, setAttendees] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalStates, setModalStates] = useState({
    newAttendee: false,
    existingAttendee: false,
    deleteConfirm: false,
    viewEvents: false,
  });
  
  const handleViewEvents = (attendee) => {
    setSelectedAttendee(attendee);
    toggleModal("viewEvents", true);
  };

  const navigate = useNavigate();

  // Custom hook for pagination
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems: currentAttendees,
    indexOfFirstItem,
    indexOfLastItem
  } = usePagination(attendees, itemsPerPage);

  // Fetch functions
  const fetchEvents = useCallback(async () => {
    try {
      const response = await getEvents();
      setEvents(response.data.data);
    } catch (error) {
      toast.error("Error fetching events");
    }
  }, []);
  
  const handleDelete = async (attendeeId, eventIds) => {
    try {
      await removeAttendee(attendeeId, eventIds);
      toast.success("Attendee removed from selected events");
      fetchAttendees();
    } catch (error) {
      toast.error("Error removing attendee");
    }
  };

  const fetchAttendees = useCallback(async (searchTerm = "") => {
    try {
      setLoading(true);
      const response = await getAttendees({ name: searchTerm });
      setAttendees(response?.data?.data || []);
    } catch (error) {
      toast.error("Error fetching attendees");
      setAttendees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Modal handlers
  const toggleModal = (modalName, value) => {
    setModalStates(prev => ({ ...prev, [modalName]: value }));
    
    if (modalName === 'deleteConfirm' && !value) {
      setSelectedAttendee(null); // Reset selected attendee when closing modal
    }
  };

  // Effects
  useEffect(() => {
    fetchAttendees();
    fetchEvents();
  }, [fetchAttendees, fetchEvents]);

  // Handle new attendee submission
  const handleNewAttendeeSubmit = async (formData) => {
    try {
      await addAttendeeToEvent(formData);
      toast.success("Attendee added successfully");
      toggleModal("newAttendee", false);
      fetchAttendees();
    } catch (error) {
      toast.error("Error adding attendee");
    }
  };

  // Handle existing attendee submission
  const handleExistingAttendeeSubmit = async (data) => {
    try {
      await addAttendeeToEvent({
        eventId: data.eventId,
        name: data.attendee.name,
        email: data.attendee.email,
      });
      toast.success("Attendee added to event successfully");
      toggleModal("existingAttendee", false);
      fetchAttendees();
    } catch (error) {
      toast.error("Error adding attendee to event");
    }
  };

  // Effects
  useEffect(() => {
    fetchAttendees(searchQuery);
  }, [searchQuery, fetchAttendees]);

  useEffect(() => {
    if (modalStates.newAttendee || modalStates.existingAttendee) {
      fetchEvents();
    }
  }, [modalStates.newAttendee, modalStates.existingAttendee, fetchEvents]);

  // Render functions
  const renderActionButtons = () => (
    <div className="d-flex gap-2">
      <Button 
        variant="primary"
        onClick={() => toggleModal("newAttendee", true)}
        className="d-flex align-items-center gap-2"
      >
        <i className="fas fa-plus"></i>
        Add New Attendee
      </Button>
      <Button
        variant="secondary"
        onClick={() => toggleModal("existingAttendee", true)}
        className="d-flex align-items-center gap-2"
      >
        <i className="fas fa-user-plus"></i>
        Add Existing Nominee
      </Button>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Attendee List</h4>
              {renderActionButtons()}
            </Card.Header>
            <Card.Body className="px-0">
              <div className="table-responsive">
                <div className="d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center gap-3">
                  <span>Show</span>
                    <Form.Select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      style={{ width: "100px" }}
                    >
                      {[10, 25, 50, 100].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </Form.Select>
                   
                  </div>
                  <Form.Control
                    type="search"
                    placeholder="Search attendees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-auto"
                  />
                </div>

                <Table striped bordered hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Events</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAttendees.map((attendee) => (
                      <tr key={attendee._id}>
                        <td>{attendee.name}</td>
                        <td>{attendee.email}</td>
                        <td>
                          <Button
                            variant="info"
                            size="sm"
                            onClick={() => handleViewEvents(attendee)}
                          >
                            View Events ({attendee.events?.length || 0})
                          </Button>
                        </td>
                        <td className="text-center">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => { 
                            setSelectedAttendee(attendee); 
                            toggleModal("deleteConfirm", true); 
                          }}
                          >
                            <i className="fas fa-trash-alt">Delete</i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-between align-items-center p-3">
                  <span>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, attendees.length)} of {attendees.length} entries
                  </span>
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <NewAttendeeModal
        show={modalStates.newAttendee}
        onHide={() => toggleModal("newAttendee", false)}
        events={events}
        onSubmit={handleNewAttendeeSubmit}
      />

      <ExistingAttendeeModal
        show={modalStates.existingAttendee}
        onHide={() => toggleModal("existingAttendee", false)}
        events={events}
        onSubmit={handleExistingAttendeeSubmit}
      />
      {selectedAttendee && (
          <ViewEventsModal
            show={modalStates.viewEvents}
            onHide={() => toggleModal("viewEvents", false)}
            attendee={selectedAttendee}
          />
        )}
        {selectedAttendee && (
        <DeleteAttendeeModal
          show={modalStates.deleteConfirm}
          onHide={() => toggleModal("deleteConfirm", false)}
          attendee={selectedAttendee}
          events={events}
          onDelete={handleDelete}
        />
      )}
    </Fragment>
  );
});

AttendeeList.displayName = "AttendeeList";
export default AttendeeList;