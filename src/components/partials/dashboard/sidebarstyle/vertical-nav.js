import React, { useState, useContext, memo, Fragment } from "react";

//Router
import { Link, useLocation } from "react-router-dom";
import { isLoggedIn, userData } from "../../../../Redux/auth/authSlice";

//React-bootstrap
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

//Componets
import SidebarMenu from "../../components/sidebar/sidebar-menu";
import { useSelector } from "react-redux";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const VerticalNav = memo(() => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [show, setShow] = useState(false);

  const user = useSelector(userData);
  const [active, setActive] = useState("");
  //location
  let location = useLocation();

  return (
    <Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">EVENTS</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>
        <Accordion.Item
          as="li"
          eventKey="sidebar-special"
          bsPrefix={`nav-item ${
            location.pathname === "/createEvent"
              ? "active"
              : "" 
          } `}
          onClick={() => setActive("special")}
        >
          <CustomToggle
            eventKey="sidebar-special"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Create</Tooltip>}
            >
              <i className="icon">
                <svg
                  width="20"
                  className="icon-20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.07999 6.64999V6.65999C7.64899 6.65999 7.29999 7.00999 7.29999 7.43999C7.29999 7.86999 7.64899 8.21999 8.07999 8.21999H11.069C11.5 8.21999 11.85 7.86999 11.85 7.42899C11.85 6.99999 11.5 6.64999 11.069 6.64999H8.07999ZM15.92 12.74H8.07999C7.64899 12.74 7.29999 12.39 7.29999 11.96C7.29999 11.53 7.64899 11.179 8.07999 11.179H15.92C16.35 11.179 16.7 11.53 16.7 11.96C16.7 12.39 16.35 12.74 15.92 12.74ZM15.92 17.31H8.07999C7.77999 17.35 7.48999 17.2 7.32999 16.95C7.16999 16.69 7.16999 16.36 7.32999 16.11C7.48999 15.85 7.77999 15.71 8.07999 15.74H15.92C16.319 15.78 16.62 16.12 16.62 16.53C16.62 16.929 16.319 17.27 15.92 17.31Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </i>
            </OverlayTrigger>
            <span className="item-name">Events</span>
            <i className="right-icon">
              <svg
                className="icon-18 submit"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-special">
            <ul className="sub-nav">
              <SidebarMenu
                isTag="false"
                staticIcon="true"
                pathname="/createEvent"
                title="Create Event"
                minititle="G"
              ></SidebarMenu>
              <SidebarMenu
                isTag="false"
                staticIcon="true"
                pathname="/events"
                title="View Events"
                minititle="T"
              ></SidebarMenu>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>

    
      </Accordion>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <Accordion.Item
          as="li"
          eventKey="sidebar-special"
          bsPrefix={`nav-item ${
            location.pathname === "/viewAttendees"
              ? "active"
              : "" 
          } `}
          onClick={() => setActive("special")}
        >
          <CustomToggle
            eventKey="sidebar-special"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Create</Tooltip>}
            >
              <i className="icon">
                <svg
                  width="20"
                  className="icon-20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.07999 6.64999V6.65999C7.64899 6.65999 7.29999 7.00999 7.29999 7.43999C7.29999 7.86999 7.64899 8.21999 8.07999 8.21999H11.069C11.5 8.21999 11.85 7.86999 11.85 7.42899C11.85 6.99999 11.5 6.64999 11.069 6.64999H8.07999ZM15.92 12.74H8.07999C7.64899 12.74 7.29999 12.39 7.29999 11.96C7.29999 11.53 7.64899 11.179 8.07999 11.179H15.92C16.35 11.179 16.7 11.53 16.7 11.96C16.7 12.39 16.35 12.74 15.92 12.74ZM15.92 17.31H8.07999C7.77999 17.35 7.48999 17.2 7.32999 16.95C7.16999 16.69 7.16999 16.36 7.32999 16.11C7.48999 15.85 7.77999 15.71 8.07999 15.74H15.92C16.319 15.78 16.62 16.12 16.62 16.53C16.62 16.929 16.319 17.27 15.92 17.31Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </i>
            </OverlayTrigger>
            <span className="item-name">Attendees</span>
            <i className="right-icon">
              <svg
                className="icon-18 submit"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-special">
            <ul className="sub-nav">
              <SidebarMenu
                isTag="false"
                staticIcon="true"
                pathname="/viewAttendees"
                title="View Attendees"
                minititle="G"
              ></SidebarMenu>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>   
      </Accordion>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <Accordion.Item
          as="li"
          eventKey="sidebar-special"
          bsPrefix={`nav-item ${
            location.pathname === "/viewTasks"
              ? "active"
              : "" 
          } `}
          onClick={() => setActive("special")}
        >
          <CustomToggle
            eventKey="sidebar-special"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Create</Tooltip>}
            >
              <i className="icon">
                <svg
                  width="20"
                  className="icon-20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.07999 6.64999V6.65999C7.64899 6.65999 7.29999 7.00999 7.29999 7.43999C7.29999 7.86999 7.64899 8.21999 8.07999 8.21999H11.069C11.5 8.21999 11.85 7.86999 11.85 7.42899C11.85 6.99999 11.5 6.64999 11.069 6.64999H8.07999ZM15.92 12.74H8.07999C7.64899 12.74 7.29999 12.39 7.29999 11.96C7.29999 11.53 7.64899 11.179 8.07999 11.179H15.92C16.35 11.179 16.7 11.53 16.7 11.96C16.7 12.39 16.35 12.74 15.92 12.74ZM15.92 17.31H8.07999C7.77999 17.35 7.48999 17.2 7.32999 16.95C7.16999 16.69 7.16999 16.36 7.32999 16.11C7.48999 15.85 7.77999 15.71 8.07999 15.74H15.92C16.319 15.78 16.62 16.12 16.62 16.53C16.62 16.929 16.319 17.27 15.92 17.31Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </i>
            </OverlayTrigger>
            <span className="item-name">Task Management</span>
            <i className="right-icon">
              <svg
                className="icon-18 submit"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-special">
            <ul className="sub-nav">
              <SidebarMenu
                isTag="false"
                staticIcon="true"
                pathname="/viewTasks"
                title="View Tasks"
                minititle="G"
              ></SidebarMenu>
             
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>   
      </Accordion>
    </Fragment>
  );
});

VerticalNav.displayName = "VerticalNav";
export default VerticalNav;
