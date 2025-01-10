import React, { memo, useState, useEffect } from "react";
import { formatDate, getTasks, updateTaskStatus, getEvents, getAttendees,createTask } from "../../../Redux/commonApi";
import { Row, Col, Table, Form, Spinner, Pagination, Button, Modal, ProgressBar } from "react-bootstrap";
import { Fragment } from "react";
import Card from "../../../components/Card/card";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./tasks.css";

const TaskList = memo(() => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newProgress, setNewProgress] = useState(0);
  const [filterEvent, setFilterEvent] = useState("all");
  const [eventsList, setEventsList] = useState([]);
  
  // New states for task assignment
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState("");
  const [newTask, setNewTask] = useState({
    name: "",
    deadline: "",
    eventId: "",
    assignedAttendee: ""
  });

  const navigate = useNavigate();

  const fetchData = async (eventId = "") => {
    try {
      setLoading(true);
      const requestBody = {};

      if (eventId && eventId !== "all") {
        requestBody.eventId = eventId;
      }

      const response = await getTasks(requestBody);

      if (response?.data?.tasks) {
        setTasks(response.data.tasks);
        setTotalEntries(response.data.tasks.length);
      } else {
        setTasks([]);
        setTotalEntries(0);
      }
    } catch (error) {
      console.error("Error fetching task data:", error);
      toast.error(error.message || "Error fetching tasks");
      setTasks([]);
      setTotalEntries(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      if (response?.data) {
        setEventsList(response.data.data);
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchData(filterEvent);
  }, [filterEvent]);

  const handleEventFilterChange = (event) => {
    setFilterEvent(event.target.value);
    setCurrentPage(1);
  };

  // Fetch attendees based on selected event
  const fetchAttendees = async (eventId) => {
    try {
      const response = await getAttendees(eventId);
      if (response?.data?.data) {
        setAttendees(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching attendees:", error);
      toast.error("Error fetching attendees");
    }
  };

  useEffect(() => {
    fetchData();
    fetchEvents(); // Fetch events on component mount
  }, []);

  // Fetch attendees when an event is selected
  useEffect(() => {
    if (selectedEvent) {
      fetchAttendees(selectedEvent);
    }
  }, [selectedEvent]);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setNewProgress(task.progressPercentage);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleProgressChange = (event) => {
    setNewProgress(event.target.value);
  };

  const handleUpdateProgress = async () => {
    try {
      const response = await updateTaskStatus(selectedTask._id, { progressPercentage: newProgress });
      if (response?.data) {
        toast.success("Progress updated successfully!");
        fetchData();
        closeEditModal();
      } else {
        toast.error("Failed to update progress");
      }
    } catch (error) {
      console.error("Error updating task progress:", error);
      toast.error("Error updating task progress");
    }
  };

  // New handlers for task assignment
  const openAssignModal = () => {
    setShowAssignModal(true);
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
    setSelectedEvent("");
    setSelectedAttendee("");
    setNewTask({
      name: "",
      deadline: "",
      eventId: "",
      assignedAttendee: ""
    });
  };

  const handleEventSelect = (eventId) => {
    setSelectedEvent(eventId);
    setNewTask(prev => ({ ...prev, eventId }));
  };

  const handleAttendeeSelect = (assignedAttendee) => {
    setSelectedAttendee(assignedAttendee);
    setNewTask(prev => ({ ...prev, assignedAttendee }));
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssignTask = async () => {
    try {
      const response = await createTask(newTask);
      if (response?.data) {
        toast.success("Task assigned successfully!");
        fetchData();
        closeAssignModal();
      } else {
        toast.error("Failed to assign task");
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      toast.error("Error assigning task");
    }
  };

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Task List</h4>
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
                          style={{ width: "100px" }}
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </Form.Select>
                        <span className="ms-3">Events:</span>
                        <Form.Select
                          value={filterEvent}
                          onChange={handleEventFilterChange}
                          style={{ width: "200px" }}
                        >
                          <option value="all">All Events</option>
                          {eventsList.map((event) => (
                            <option key={event._id} value={event._id}>
                              {event.name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <Button variant="primary" onClick={openAssignModal}>
                          Assign Task
                        </Button>
                      </div>
                    </div>

                    <Table striped bordered hover className="custom-table movie_table">
                      <thead>
                        <tr>
                          <th>Task Name</th>
                          <th>Deadline</th>
                          <th>Progress</th>
                          <th>Status</th>
                          <th>Attendee Name</th>
                          <th>Event Name</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTasks.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No tasks found
                            </td>
                          </tr>
                        ) : (
                          currentTasks.map((task) => (
                            <tr key={task._id}>
                              <td>{task.name}</td>
                              <td>{formatDate(task.deadline)}</td>
                              <td>
                                <ProgressBar now={task.progressPercentage} label={`${task.progressPercentage}%`} />
                              </td>
                              <td>{task.status}</td>
                              <td>{task.attendeeName}</td>
                              <td>{task.eventName}</td>
                              <td className="text-center">
                                <div className="flex align-items-center list-user-action">
                                  <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => openEditModal(task)}
                                  >
                                    Edit
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
                            Showing {indexOfFirstTask + 1} to{" "}
                            {Math.min(indexOfLastTask, totalEntries)} of {totalEntries} entries
                          </p>
                        )}
                      </div>
                      <Pagination>
                        <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1}>
                          Previous
                        </Pagination.Prev>
                        {Array.from({ length: Math.ceil(totalEntries / itemsPerPage) }, (_, index) => (
                          <Pagination.Item
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => handlePageClick(index + 1)}
                          >
                            {index + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={handleNextPage}
                          disabled={currentPage >= Math.ceil(totalEntries / itemsPerPage)}
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

      {/* Edit Progress Modal */}
      {selectedTask && (
        <Modal show={showModal} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task Progress</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="progress">
                <Form.Label>Progress Percentage</Form.Label>
                <Form.Control
                  type="number"
                  value={newProgress}
                  onChange={handleProgressChange}
                  min={0}
                  max={100}
                  step={1}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateProgress}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Assign Task Modal */}
      <Modal show={showAssignModal} onHide={closeAssignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Event</Form.Label>
              <Form.Select
                value={selectedEvent}
                onChange={(e) => handleEventSelect(e.target.value)}
              >
                <option value="">Choose an event...</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {selectedEvent && (
              <Form.Group className="mb-3">
                <Form.Label>Select Attendee</Form.Label>
                <Form.Select
                  value={selectedAttendee}
                  onChange={(e) => handleAttendeeSelect(e.target.value)}
                >
                  <option value="">Choose an attendee...</option>
                  {attendees.map((attendee) => (
                    <option key={attendee._id} value={attendee._id}>
                      {attendee.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newTask.name}
                onChange={handleTaskInputChange}
                placeholder="Enter task name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                name="deadline"
                value={newTask.deadline}
                onChange={handleTaskInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAssignModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssignTask}
            disabled={!selectedEvent || !selectedAttendee || !newTask.name || !newTask.deadline}
          >
            Assign Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
});

TaskList.displayName = "TaskList";
export default TaskList;