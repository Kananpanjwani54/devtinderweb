import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <ErrorContext.Provider value={{ hasError, setHasError }}>
      {children}
    </ErrorContext.Provider>
  );
};
