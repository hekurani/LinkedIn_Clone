import React, { createContext, useState, useContext } from "react";
import ShowAlert from "./showAlert";
const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    text: "",
    variant: "",
    isVisible: false,
  });

  const showAlert = ({ text, variant }) => {
    setAlert({ text, variant, isVisible: true });
    setTimeout(
      () => setAlert({ text: "", variant: "", isVisible: false }),
      3000
    );
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert.isVisible && (
        <ShowAlert text={alert.text} variant={alert.variant} />
      )}
    </AlertContext.Provider>
  );
};
