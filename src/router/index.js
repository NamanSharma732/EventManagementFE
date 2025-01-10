import PrivateRoute from './PrivateRoute';
import Default from "../layouts/dashboard/default";
import EventList from '../views/dashboard/events/event-list';
import EventAdd from '../views/dashboard/events/event-add';
import EventEdit from '../views/dashboard/events/event-edit';
import AttendeeList from '../views/dashboard/attendees/view-attendee';
import TaskList from '../views/dashboard/tasks/task-list';

export const IndexRouters = [
  {
    path: "",
    element: <PrivateRoute><Default /></PrivateRoute>,
    children: [
      {
        path: "/events",
        element: <PrivateRoute><EventList /></PrivateRoute>,
        name: "home",
        active: "home",
      },
      {
        path: "/createEvent",
        element: <PrivateRoute><EventAdd /></PrivateRoute>,
        name:"event",
        active:"event"
      },
      {
        path: "/editEvent",
        element: <PrivateRoute><EventEdit /></PrivateRoute>,
        name:"event",
        active:"event"
      },
      {
        path: "/viewAttendees",
        element: <PrivateRoute><AttendeeList /></PrivateRoute>,
        name:"event",
        active:"event"
      },
      {
        path:"/viewTasks",
        element:<PrivateRoute><TaskList></TaskList></PrivateRoute>,
        name : "Tasks",
        active:"Tasks"
      },

    ],
    
  },
];
