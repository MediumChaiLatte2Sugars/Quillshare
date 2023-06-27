import React, { createContext, useState, useEffect } from 'react';
const DarkReader = require('darkreader');

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    if (darkModeEnabled) {
      DarkReader.enable();
    } else {
      DarkReader.disable();
    }

    return () => {
      DarkReader.auto();
    };
  }, [darkModeEnabled]);

  return (
    <DarkModeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled }}>
      {children}
    </DarkModeContext.Provider>
  );
};
