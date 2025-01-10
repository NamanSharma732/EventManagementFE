import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./Redux/hooks";
import { setSetting } from "./Redux/setting/actions";
import { setSessionExpired } from "./Redux/auth/authSlice";
import SessionExpiredAlert from "./components/SessionExpiredAlert"; // Import the session alert component

// SCSS and CSS imports
import "./assets/modules/landing-pages/scss/landing-pages.scss";
import "shepherd.js/dist/css/shepherd.css";
import "flatpickr/dist/flatpickr.css";
import "choices.js/public/assets/styles/choices.min.css";
import "./assets/scss/hope-ui.scss";
import "./assets/scss/pro.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/rtl.scss";
import "./assets/scss/customizer.scss";
import "./assets/custom/scss/custom.scss";
import "react-toastify/dist/ReactToastify.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

function App({ children }) {
  const dispatch = useAppDispatch();
  
  // Get the session state from Redux store (Assuming sessionExpired is part of auth state)
  const sessionExpired = useSelector(state => state.auth.sessionExpired);

  // Set settings when the app loads
  useEffect(() => {
    dispatch(setSetting());
  }, [dispatch]);

  
  useEffect(() => {
    const token = sessionStorage.getItem('jwt_token'); 
    if (token) {
      const expiry = JSON.parse(atob(token.split('.')[1])).exp; 
      if (Date.now() >= expiry * 1000) {
        dispatch(setSessionExpired(true)); 
      }
    }
  }, [dispatch]);

  return (
    <>
      <div className="App">
        {children}
      </div>

      {/* Toast notifications */}
      <ToastContainer autoClose={2000} />

      {/* Session expiration alert */}
      {sessionExpired && <SessionExpiredAlert />}
    </>
  );
}

export default App;
