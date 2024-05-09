import React, { createContext, useState, useEffect } from 'react';

export const userdataContext = createContext();

const Contextshare = ({ children }) => {
  const [userdata, setUserdata] = useState(() => {
    // Retrieve user data from local storage during component initialization
    const storedUserData = localStorage.getItem('existed-user');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    // Save user data to local storage whenever it changes
    localStorage.setItem('existed-user', JSON.stringify(userdata));
  }, [userdata]);

  return (
    <div>
      <userdataContext.Provider value={{ userdata, setUserdata }}>
        {children}
      </userdataContext.Provider>
    </div>
  );
};

export default Contextshare;


