import React, { Children } from "react";

import SignUp from "../views/dashboard/auth/sign-up";

export const SimpleRouter = [
  {
    path: "/sign-up",
    element: <SignUp />,
    children:[]
  },
];
