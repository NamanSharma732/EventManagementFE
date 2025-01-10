import React, { useEffect, memo, Fragment, useContext } from "react";
import { useLocation, Outlet, Link } from "react-router-dom";

//react-shepherd
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";

// header
import Headerpro from "../../components/partials/pro/headerstyle/header-pro";

//sidebar
import Sidebar from "../../components/partials/dashboard/sidebarstyle/sidebar";

//seetingoffCanvas
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";

import Loader from "../../components/Loader";

// Import selectors & action from setting store
import * as SettingSelector from "../../Redux/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";
import { Suspense } from "react";
import SubHeader from "../../components/partials/dashboard/headerstyle/sub-header";

const Tour = () => {
  const tour = useContext(ShepherdTourContext);
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      pathname === "/dashboard" &&
      sessionStorage.getItem("tour") !== "true"
    ) {
      tour?.start();
    }
  });
  return <Fragment></Fragment>;
};

const Default = memo((props) => {
  let location = useLocation();
  const pageLayout = useSelector(SettingSelector.page_layout);
  const appName = useSelector(SettingSelector.app_name);

  var subHeader = "";
  var commanclass = "";
  switch (location.pathname) {
    case "/events":
         subHeader = <SubHeader Title="Events" />;
         commanclass = "iq-banner default";
         break;
    case "/createEvent":
         subHeader = <SubHeader Title="Create Event" />;
         commanclass = "iq-banner default";
         break;
    case "/editEvent": 
          subHeader = <SubHeader Title="Edit Event" />;
          commanclass = "iq-banner default";
          break;
    case "/viewAttendees":
             subHeader = <SubHeader Title="View Attendees" />;
             commanclass = "iq-banner default";
             break;
    case "/viewTasks":
              subHeader = <SubHeader Title="View Tasks" />;
              commanclass = "iq-banner default";
              break;
    default:
      break;
  }

  return (
    <Fragment>
      <Loader />
      <Sidebar app_name={appName} />
      <Tour />
      <main className="main-content">
        <div className={`${commanclass} position-relative `}>
          <Headerpro />
          {subHeader}
        </div>
        <div className={` ${pageLayout} content-inner pb-0`}>
          <Suspense fallback={<div className="react-load"></div>}>
            <Outlet></Outlet>
          </Suspense>
        </div>
      </main>

      <SettingOffCanvas />
    </Fragment>
  );
});

Default.displayName = "Default";
export default Default;
