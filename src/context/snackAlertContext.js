import React, { useEffect, useContext, useState, createContext } from "react";

const SnackContext = createContext();
export const useSnackContext = () => useContext(SnackContext);

const SnackProvider = ({ children }) => {
  const [severity, setseverity] = useState("error");
  const [open, setopen] = useState(false);
  const [title, settitle] = useState("");
  const [message, setmessage] = useState("");

  const clearclose = () => {
    setopen(false);
    settitle("");
    setmessage("");
    setseverity("error");
  };

  return (
    <SnackContext.Provider
      value={{
        severity,
        setseverity,
        open,
        setopen,
        clearclose,
        title,
        settitle,
        message,
        setmessage,
      }}
    >
      {children}
    </SnackContext.Provider>
  );
};

export default SnackProvider;
