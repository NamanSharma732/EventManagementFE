import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const StateManageContext = createContext();

const StateContextProvider = ({ children }) => {



  const contextValue = {
  };

  return (
    <StateManageContext.Provider value={contextValue}>
      {children}
    </StateManageContext.Provider>
  );
};

const useManageState = () => {
  const context = useContext(StateManageContext);
  if (!context) {
    throw new Error("useManageState must be used within a StateContextProvider");
  }
  return context;
};

export { useManageState, StateContextProvider };
