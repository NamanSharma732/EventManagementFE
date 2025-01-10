import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Index.css"
// import reportWebVitals from './reportWebVitals';
import "react-datepicker/dist/react-datepicker.css";

//router
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Index from "./views/index";

//store

import { Provider } from "react-redux";
import { Navigate } from "react-router-dom";
//reducer
import { IndexRouters } from "./router";
import { StateContextProvider } from "./CustomHook/StateManager";
import { store } from "./Redux";
import SignIn from "./views/dashboard/auth/sign-in";
import SignUp from "./views/dashboard/auth/sign-up";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path:"/signup",
      element:<SignUp/>
    },
    ...IndexRouters,
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <StateContextProvider>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
      </StateContextProvider>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
