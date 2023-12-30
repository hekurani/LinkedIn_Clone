import { createContext, useContext, useState } from "react";

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(""); //emaili i shtypen nga user per forgot password
  const [otp, setOTP] = useState(""); //code per verifikim

  return (
    <EmailContext.Provider value={{ email, setEmail,otp,setOTP }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  return useContext(EmailContext);
};
