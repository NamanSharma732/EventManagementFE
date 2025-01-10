import React, { memo, Fragment, useState, useEffect } from "react";
import {
  formatDate,
  updateAgentPassword,
  getEvents,
  deleteAgent,
  updateAgentStatus,
  deleteEvent,
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
import "./event.css";

const EventList = memo(() => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);

  const navigate = useNavigate();

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const fetchData = async (name = "", date = null) => {
    try {
      setLoading(true);
      const requestBody = {};

      if (name) {
        requestBody.name = name;
      }

      if (date) {
        // Send the full date string
        requestBody.date = date;
      }

      const response = await getEvents(requestBody);

      if (response?.data?.data) {
        setEvents(response.data.data);
        setTotalEntries(response.data.data.length);
      } else {
        setEvents([]);
        setTotalEntries(0);
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
      toast.error(error.message || "Error fetching events");
      setEvents([]);
      setTotalEntries(0);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((query) => {
    if (query.length === 0 || query.length > 3) {
      fetchData(query, selectedDate);
    }
  }, 1000);

  useEffect(() => {
    fetchData(searchQuery, selectedDate);
  }, [selectedDate]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleDateChange = (date) => {
    if (date === null) {
      setSelectedDate(null); 
    } else {
      const utcDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        );
       setSelectedDate(utcDate);
    }
  };
  

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    try {
      if (eventToDelete) {
        await deleteEvent(eventToDelete._id);
        await fetchData(searchQuery, selectedDate);
        setShowDeleteModal(false);
        toast.success("Event Deleted Successfully");
      }
    } catch (error) {
      toast.error("Error deleting event");
    }
  };

  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalEntries / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleEdit = (event) => {
    const date = new Date(event.date);
    const formattedDate = date.toISOString().split('T')[0];

    const params = new URLSearchParams({
      name: event.name,
      description: event.description,
      date: formattedDate,
      location: event.location,
      id: event._id 
    });

    navigate(`/editEvent?${params.toString()}`);
  };

  const handleCreateEvent = () => {
    navigate("/createEvent");
  };

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Event List</h4>
              </div>
            </Card.Header>
            <Card.Body className="px-0">
              <div className="table-responsive">
                {loading ? (
                  <div className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-3 p-3">
                      <div className="d-flex align-items-center gap-3">
                        <span>Show</span>
                        <Form.Select
                          value={itemsPerPage}
                          onChange={handleItemsPerPageChange}
                          style={{width:"100px"}}
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </Form.Select>
                        <span>Date</span>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          className="form-control"
                          dateFormat="MM/dd/yyyy"
                          placeholderText="Select date"
                          isClearable
                        />
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <Form.Group controlId="searchField" className="s2">
                          <Form.Label className="s4">Search</Form.Label>
                          <Form.Control
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search events..."
                          />
                        </Form.Group>
                        <Button variant="primary" onClick={handleCreateEvent}>
                          Add Event
                        </Button>
                      </div>
                    </div>

                    <Table
                      striped
                      bordered
                      hover
                      className="custom-table movie_table"
                    >
                      <thead>
                        <tr>
                          <th>Event Name</th>
                          <th>Description</th>
                          <th>Location</th>
                          <th>Event Date</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEvents.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No events found
                            </td>
                          </tr>
                        ) : (
                          currentEvents.map((event) => (
                            <tr key={event._id}>
                              <td>{event.name}</td>
                              <td>
                                {event.description.length > 50
                                  ? `${event.description.substring(0, 50)}...`
                                  : event.description}
                              </td>
                              <td>{event.location}</td>
                              <td>{formatDate(event.date)}</td>
                              <td className="text-center">
                                <div className="flex align-items-center list-user-action">
                                  <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(event)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => openDeleteModal(event)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>

                    <div className="d-flex justify-content-between p-3">
                      <div>
                        {totalEntries > 0 && (
                          <p>
                            Showing {indexOfFirstEvent + 1} to{" "}
                            {Math.min(indexOfLastEvent, totalEntries)} of{" "}
                            {totalEntries} entries
                          </p>
                        )}
                      </div>
                      <Pagination>
                        <Pagination.Prev
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Pagination.Prev>
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        <Pagination.Next
                          onClick={handleNextPage}
                          disabled={
                            currentPage >=
                            Math.ceil(totalEntries / itemsPerPage)
                          }
                        >
                          Next
                        </Pagination.Next>
                      </Pagination>
                    </div>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
});

EventList.displayName = "EventList";
export default EventList;
